import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SearchCard from '../components/SearchCard';
import BusList from '../components/BusList';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import LogoModal from '../components/LogoModal';
import AboutModal from '../components/AboutModal';
import { useBusData } from '../hooks/useBusData';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Home() {
  const [logoModalOpen, setLogoModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);

  const handleOpenLogo = () => setLogoModalOpen(true);
  const handleOpenAbout = () => setAboutModalOpen(true);

  const {
    routes,
    selectedRoute,
    selectRoute,
    buses,
    rawBuses,
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

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top App Bar - Centered Vertically */}
      <Navbar onOpenLogo={handleOpenLogo} />

      {/* Hero Banner with Floating Glassmorphism Hamburger Button */}
      <Hero
        onOpenLogo={handleOpenLogo}
        onOpenAbout={handleOpenAbout}
        lastUpdated={lastUpdated}
      />

      {/* Floating Search Card */}
      <SearchCard
        routes={routes}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredRoutes={filteredRoutes}
        selectedRoute={selectedRoute}
        onSelectRoute={selectRoute}
        loadingRoutes={loadingRoutes}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {routesError ? (
          <div className="max-w-md mx-auto my-12 p-6 bg-red-50 border border-red-200 rounded-3xl text-center space-y-4 shadow-sm">
            <AlertTriangle className="w-10 h-10 text-red-500 mx-auto" />
            <h3 className="text-lg font-bold text-red-900">Network Error</h3>
            <p className="text-sm text-red-700 font-medium">{routesError}</p>
            <button
              onClick={handleRefresh}
              className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
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

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Modern Footer */}
      <Footer
        lastUpdated={lastUpdated}
        onOpenLogo={handleOpenLogo}
        onOpenAbout={handleOpenAbout}
      />

      {/* Logo Modal */}
      <LogoModal isOpen={logoModalOpen} onClose={() => setLogoModalOpen(false)} />

      {/* About Modal */}
      <AboutModal isOpen={aboutModalOpen} onClose={() => setAboutModalOpen(false)} />
    </div>
  );
}
