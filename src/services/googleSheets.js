const SHEET_ID = '1dlwT7_26WZxaPLrDnMc4LdhEydPq0mSSHVM054yMYNQ';
const BASE_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

// Cache storage for sheets data
const memoryCache = new Map();

/**
 * Parses Google Visualization API response string into JSON object
 * @param {string} text 
 * @returns {object}
 */
function parseGVizResponse(text) {
  try {
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error('Invalid GViz response format');
    }
    const jsonString = text.substring(jsonStart, jsonEnd);
    return JSON.parse(jsonString);
  } catch (err) {
    console.error('Error parsing GViz response:', err);
    throw new Error('Failed to parse spreadsheet data');
  }
}

/**
 * Parses a date/time value from GViz format to standard 12-hour formatted time (e.g., "07:15 AM")
 * and returns both formatted string and minute offset from midnight for sorting.
 * @param {any} cellValue 
 * @param {string} cellFormatted 
 * @returns {{ timeStr: string, minutes: number }}
 */
function parseBusTime(cellValue, cellFormatted) {
  if (cellFormatted && typeof cellFormatted === 'string' && cellFormatted.trim() !== '') {
    const formatted = cellFormatted.trim();
    const mins = timeStringToMinutes(formatted);
    return { timeStr: formatted, minutes: mins };
  }

  if (typeof cellValue === 'string') {
    if (cellValue.startsWith('Date(')) {
      const parts = cellValue.match(/Date\((\d+),(\d+),(\d+),(\d+),(\d+),(\d+)\)/);
      if (parts) {
        const hours = parseInt(parts[4], 10);
        const mins = parseInt(parts[5], 10);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const timeStr = `${displayHours}:${mins.toString().padStart(2, '0')} ${ampm}`;
        return { timeStr, minutes: hours * 60 + mins };
      }
    } else {
      const mins = timeStringToMinutes(cellValue);
      return { timeStr: cellValue, minutes: mins };
    }
  }

  return { timeStr: 'N/A', minutes: 9999 };
}

/**
 * Helper to convert time strings like "7:15 AM", "07:15 AM", "14:30", "7.15 AM" into total minutes from midnight
 * @param {string} str 
 * @returns {number}
 */
function timeStringToMinutes(str) {
  if (!str || typeof str !== 'string') return 9999;
  const cleanStr = str.trim().toUpperCase();
  const isPM = cleanStr.includes('PM');
  const isAM = cleanStr.includes('AM');

  const numbersOnly = cleanStr.replace(/[^0-9:]/g, '');
  const parts = numbersOnly.split(':');
  if (parts.length >= 2) {
    let h = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    if (isNaN(h) || isNaN(m)) return 9999;

    if (isPM && h < 12) h += 12;
    if (isAM && h === 12) h = 0;
    return h * 60 + m;
  }
  return 9999;
}

/**
 * Parses route string into English and Malayalam components if available
 * e.g., "Trivandrum / തിരുവനന്തപുരം" => english: "Trivandrum", malayalam: "തിരുവനന്തപുരം"
 * @param {string} rawRoute 
 * @returns {{ id: string, rawName: string, englishName: string, malayalamName: string }}
 */
function parseRouteName(rawRoute) {
  const trimmed = rawRoute.trim();
  if (trimmed.includes('/')) {
    const parts = trimmed.split('/');
    return {
      id: trimmed,
      rawName: trimmed,
      englishName: parts[0].trim(),
      malayalamName: parts[1].trim(),
    };
  }
  return {
    id: trimmed,
    rawName: trimmed,
    englishName: trimmed,
    malayalamName: '',
  };
}

/**
 * Fetches all available routes from the "Routes" sheet
 * @returns {Promise<Array<{ id: string, rawName: string, englishName: string, malayalamName: string }>>}
 */
export async function fetchRoutes() {
  const cacheKey = 'sheet_Routes';
  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey);
  }

  const url = `${BASE_URL}&sheet=Routes`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error fetching routes: ${response.status}`);
  }

  const text = await response.text();
  const gviz = parseGVizResponse(text);
  const rows = gviz?.table?.rows || [];

  const routes = [];
  rows.forEach((row) => {
    const cellValue = row.c?.[0]?.v;
    if (cellValue && typeof cellValue === 'string') {
      const trimmed = cellValue.trim();
      if (trimmed.toLowerCase() !== 'route name' && trimmed !== '') {
        routes.push(parseRouteName(trimmed));
      }
    }
  });

  memoryCache.set(cacheKey, routes);
  return routes;
}

/**
 * Fetches bus schedules for a specific destination sheet name
 * @param {string} destinationSheetName 
 * @param {boolean} forceRefresh 
 * @returns {Promise<Array<{ sl: number|string, name: string, time: string, minutes: number, busType: string, isKsrtc: boolean }>>}
 */
export async function fetchDestinationBuses(destinationSheetName, forceRefresh = false) {
  if (!destinationSheetName) return [];

  const cacheKey = `sheet_dest_${destinationSheetName}`;
  if (!forceRefresh && memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey);
  }

  const url = `${BASE_URL}&sheet=${encodeURIComponent(destinationSheetName)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error fetching destination sheet: ${response.status}`);
  }

  const text = await response.text();
  const gviz = parseGVizResponse(text);
  const rows = gviz?.table?.rows || [];

  const buses = [];
  rows.forEach((row, idx) => {
    if (!row || !row.c) return;

    const slVal = row.c[0]?.v ?? row.c[0]?.f ?? (idx + 1);
    const busName = row.c[1]?.v || row.c[1]?.f || '';
    const cellValue = row.c[2]?.v;
    const cellFormatted = row.c[2]?.f;

    // Filter out header row if present
    if (
      typeof slVal === 'string' &&
      slVal.toLowerCase().includes('sl') &&
      busName.toLowerCase().includes('name')
    ) {
      return;
    }

    if (!busName && !cellValue && !cellFormatted) {
      return;
    }

    const { timeStr, minutes } = parseBusTime(cellValue, cellFormatted);
    const isKsrtc = busName.toUpperCase().includes('KSRTC');
    const busType = isKsrtc ? 'KSRTC' : 'Private';

    buses.push({
      sl: slVal,
      name: busName.trim() || 'Bus Service',
      time: timeStr,
      minutes,
      busType,
      isKsrtc,
    });
  });

  // Sort buses by departure time
  buses.sort((a, b) => a.minutes - b.minutes);

  memoryCache.set(cacheKey, buses);
  return buses;
}

/**
 * Fetches settings information (e.g. Last Updated date)
 * @returns {Promise<{ lastUpdated: string }>}
 */
export async function fetchSettings() {
  const cacheKey = 'sheet_Settings';
  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey);
  }

  try {
    const url = `${BASE_URL}&sheet=Settings`;
    const response = await fetch(url);
    if (!response.ok) {
      return { lastUpdated: '17-06-2026' };
    }
    const text = await response.text();
    const gviz = parseGVizResponse(text);
    const rows = gviz?.table?.rows || [];

    let lastUpdated = '17-06-2026';
    rows.forEach((row) => {
      const key = row.c?.[0]?.v;
      const value = row.c?.[1]?.v || row.c?.[1]?.f;
      if (key && typeof key === 'string' && key.toLowerCase() === 'lastupdated' && value) {
        lastUpdated = String(value).trim();
      }
    });

    const settings = { lastUpdated };
    memoryCache.set(cacheKey, settings);
    return settings;
  } catch (err) {
    console.warn('Could not fetch settings sheet, using fallback date', err);
    return { lastUpdated: '17-06-2026' };
  }
}

/**
 * Fetches contact information from the separate "Contact" sheet.
 * Tries multiple sheet tab name variations ('Contact', 'Contact ', etc.) to handle trailing spaces in Google Sheets.
 * Parses Key-Value rows or direct pattern matches (email/phone).
 * @returns {Promise<{ phone: string, email: string }>}
 */
export async function fetchContact() {
  const cacheKey = 'sheet_Contact';
  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey);
  }

  const candidateNames = ['Contact', 'Contact ', 'Contacts', 'Contact Details', 'contact'];

  for (const sheetName of candidateNames) {
    try {
      const url = `${BASE_URL}&sheet=${encodeURIComponent(sheetName)}`;
      const response = await fetch(url);
      if (!response.ok) continue;

      const text = await response.text();
      const gviz = parseGVizResponse(text);
      const rows = gviz?.table?.rows || [];

      if (rows.length === 0) continue;

      // Detect if GViz fell back to the default "Routes" sheet because the tab name wasn't matched
      const firstCell = String(rows[0]?.c?.[0]?.v || '').trim().toLowerCase();
      if (firstCell === 'route name' || firstCell === 'routes') {
        continue;
      }

      let phone = '';
      let email = '';

      rows.forEach((row) => {
        if (!row?.c) return;
        const cell0 = row.c[0]?.v ?? row.c[0]?.f;
        const cell1 = row.c[1]?.v ?? row.c[1]?.f;

        const val0 = cell0 !== undefined && cell0 !== null ? String(cell0).trim() : '';
        const val1 = cell1 !== undefined && cell1 !== null ? String(cell1).trim() : '';
        const keyNorm = val0.toLowerCase();

        // Match phone keys (e.g. "Secretary Phone number", "Phone", "Mobile", "Secratary Phone number")
        if (!phone && (keyNorm.includes('phone') || keyNorm.includes('mobile') || keyNorm.includes('tel') || keyNorm.includes('secratary') || keyNorm.includes('secretary'))) {
          if (val1) phone = val1;
        }

        // Match email keys (e.g. "Email", "Mail")
        if (!email && (keyNorm.includes('email') || keyNorm.includes('mail'))) {
          if (val1) email = val1;
        }

        // Fallback pattern detection in either column
        [val0, val1].forEach((str) => {
          if (!email && str.includes('@') && str.includes('.')) {
            email = str;
          }
          if (!phone && /^\+?\d[\d\s\-()]{7,}$/.test(str) && !str.toLowerCase().includes('route') && !str.toLowerCase().includes('mile')) {
            phone = str;
          }
        });
      });

      if (phone || email) {
        const contactData = { phone, email };
        memoryCache.set(cacheKey, contactData);
        return contactData;
      }
    } catch (err) {
      console.warn(`Error fetching sheet with name "${sheetName}":`, err);
    }
  }

  return { phone: '', email: '' };
}

/**
 * Clears the memory cache
 */
export function clearCache() {
  memoryCache.clear();
}
