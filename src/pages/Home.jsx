import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SearchCard from '../components/SearchCard';
import BusList from '../components/BusList';
import Footer from '../components/Footer';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import LogoModal from '../components/LogoModal';
import { useBusData } from '../hooks/useBusData';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Home() {
  const [logoModalOpen, setLogoModalOpen] = useState(false);
  const handleOpenLogo = () => setLogoModalOpen(true);

  const {
    routes,
    selectedRoute,
    selectRoute,
    buses,
    rawBuses,
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
  } = useBusData();

  const handleSelectPopularByName = (nameKey) => {
    const found = routes.find(
      (r) =>
        r.englishName.toLowerCase().includes(nameKey.toLowerCase()) ||
        r.rawName.toLowerCase().includes(nameKey.toLowerCase())
    );
    if (found) {
      selectRoute(found);
    }
    const el = document.getElementById('search-card-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top App Bar */}
      <Navbar
        onRefresh={handleRefresh}
        isRefreshing={loadingRoutes || loadingBuses}
        lastUpdated={lastUpdated}
        onSelectPopular={handleSelectPopularByName}
        onOpenLogo={handleOpenLogo}
      />

      {/* Hero Banner */}
      <Hero onOpenLogo={handleOpenLogo} />

      {/* Floating Search Card */}
      <SearchCard
        routes={routes}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredRoutes={filteredRoutes}
        selectedRoute={selectedRoute}
        onSelectRoute={selectRoute}
        popularRoutes={popularRoutes}
        loadingRoutes={loadingRoutes}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {routesError ? (
          <div className="max-w-md mx-auto my-12 p-6 bg-red-50 border border-red-200 rounded-3xl text-center space-y-4">
            <AlertTriangle className="w-10 h-10 text-red-500 mx-auto" />
            <h3 className="text-lg font-bold text-red-900">Network Error</h3>
            <p className="text-sm text-red-700">{routesError}</p>
            <button
              onClick={handleRefresh}
              className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Connection</span>
            </button>
          </div>
        ) : (
          <BusList
            selectedRoute={selectedRoute}
            buses={buses}
            rawBuses={rawBuses}
            loadingBuses={loadingBuses}
            busesError={busesError}
            busFilter={busFilter}
            setBusFilter={setBusFilter}
            onResetFilter={() => setBusFilter('ALL')}
            onRefresh={handleRefresh}
          />
        )}
      </main>

      {/* Footer */}
      <Footer lastUpdated={lastUpdated} onRefresh={handleRefresh} onOpenLogo={handleOpenLogo} />

      {/* Logo Lightbox Modal */}
      <LogoModal isOpen={logoModalOpen} onClose={() => setLogoModalOpen(false)} />
    </div>
  );
}
