import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchRoutes, fetchDestinationBuses, fetchSettings, clearCache } from '../services/googleSheets';

// Popular destinations list specified in requirements
const POPULAR_DESTINATION_KEYS = [
  'Kottayam',
  'Changanassery',
  'Pala',
  'Thiruvalla',
  'Kanjirappally',
];

export function useBusData() {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [buses, setBuses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState('17-06-2026');
  const [busFilter, setBusFilter] = useState('ALL'); // 'ALL' | 'KSRTC' | 'PRIVATE' | 'UPCOMING'

  const [loadingRoutes, setLoadingRoutes] = useState(true);
  const [loadingBuses, setLoadingBuses] = useState(false);
  const [routesError, setRoutesError] = useState(null);
  const [busesError, setBusesError] = useState(null);

  // Fetch initial routes and settings
  const initData = useCallback(async () => {
    setLoadingRoutes(true);
    setRoutesError(null);
    try {
      const [fetchedRoutes, fetchedSettings] = await Promise.all([
        fetchRoutes(),
        fetchSettings(),
      ]);

      setRoutes(fetchedRoutes);
      setLastUpdated(fetchedSettings.lastUpdated || '17-06-2026');

      
    } catch (err) {
      console.error('Error initializing bus data:', err);
      setRoutesError('Failed to load bus routes. Please check your internet connection.');
    } finally {
      setLoadingRoutes(false);
    }
  }, []);

  useEffect(() => {
    initData();
  }, [initData]);

  // Fetch buses whenever selectedRoute changes
  useEffect(() => {
    if (!selectedRoute) return;

    let isMounted = true;
    const loadBuses = async () => {
      setLoadingBuses(true);
      setBusesError(null);
      try {
        const data = await fetchDestinationBuses(selectedRoute.id);
        if (isMounted) {
          setBuses(data);
        }
      } catch (err) {
        console.error(`Error loading buses for ${selectedRoute.rawName}:`, err);
        if (isMounted) {
          setBusesError(`Could not load bus schedule for ${selectedRoute.englishName}.`);
        }
      } finally {
        if (isMounted) {
          setLoadingBuses(false);
        }
      }
    };

    loadBuses();

    return () => {
      isMounted = false;
    };
  }, [selectedRoute]);

  // Filter routes based on search query (English & Malayalam search)
  const filteredRoutes = useMemo(() => {
    if (!searchQuery.trim()) return routes;
    const query = searchQuery.trim().toLowerCase();

    return routes.filter((r) => {
      const matchEng = r.englishName.toLowerCase().includes(query);
      const matchMal = r.malayalamName.toLowerCase().includes(query);
      const matchRaw = r.rawName.toLowerCase().includes(query);
      return matchEng || matchMal || matchRaw;
    });
  }, [routes, searchQuery]);

  // Popular routes mapped to actual route objects
  const popularRoutes = useMemo(() => {
    if (!routes || routes.length === 0) return [];
    
    return POPULAR_DESTINATION_KEYS.map((key) => {
      const keyLower = key.toLowerCase();
      // First try exact match or boundary match
      const exactMatch = routes.find(
        (r) =>
          r.englishName.toLowerCase() === keyLower ||
          r.rawName.toLowerCase() === keyLower
      );
      if (exactMatch) return exactMatch;

      // Second try startsWith match (e.g. "Kanjirappally" vs "Kanjirapally")
      const startsWithMatch = routes.find(
        (r) =>
          r.englishName.toLowerCase().startsWith(keyLower) ||
          r.rawName.toLowerCase().startsWith(keyLower)
      );
      if (startsWithMatch) return startsWithMatch;

      // Fallback includes
      const fallback = routes.find(
        (r) =>
          r.englishName.toLowerCase().includes(keyLower) ||
          r.rawName.toLowerCase().includes(keyLower)
      );
      if (fallback) return fallback;

      return {
        id: key,
        rawName: key,
        englishName: key,
        malayalamName: '',
      };
    });
  }, [routes]);

  // Current time in minutes from midnight for "UPCOMING" filter
  const currentMinutes = useMemo(() => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  }, []);

  // Filter buses based on selected tab filter (ALL, KSRTC, PRIVATE, UPCOMING)
  const filteredBuses = useMemo(() => {
    if (!buses) return [];
    return buses.filter((bus) => {
      if (busFilter === 'KSRTC') return bus.isKsrtc;
      if (busFilter === 'PRIVATE') return !bus.isKsrtc;
      if (busFilter === 'UPCOMING') return bus.minutes > currentMinutes;
      return true; // ALL
    });
  }, [buses, busFilter, currentMinutes]);

  // Select a destination route
  const selectRoute = useCallback((route) => {
    setSelectedRoute(route);
    setSearchQuery('');
  }, []);

  // Force refresh current data
  const handleRefresh = useCallback(async () => {
    clearCache();
    await initData();
    if (selectedRoute) {
      setLoadingBuses(true);
      try {
        const data = await fetchDestinationBuses(selectedRoute.id, true);
        setBuses(data);
      } catch (err) {
        console.error('Refresh error:', err);
      } finally {
        setLoadingBuses(false);
      }
    }
  }, [initData, selectedRoute]);

  return {
    routes,
    selectedRoute,
    selectRoute,
    buses: filteredBuses,
    rawBuses: buses,
    popularRoutes,
    searchQuery,
    setSearchQuery,
    filteredRoutes,
    loadingRoutes,
    loadingBuses,
    routesError,
    busesError,
    lastUpdated,
    busFilter,
    setBusFilter,
    handleRefresh,
  };
}
