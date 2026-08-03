/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import OfflineOverlay from "./components/OfflineOverlay";
import { useEffect } from "react";
import Layout from "./components/Layout";
import { lazy, Suspense } from 'react';
import PageSkeleton from "./components/PageSkeleton";
import Splash from "./pages/Splash"; // keep splash eager

const Home = lazy(() => import("./pages/Home"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const OfferDetail = lazy(() => import("./pages/OfferDetail"));
const GenericPage = lazy(() => import("./pages/GenericPage"));
const Profile = lazy(() => import("./pages/Profile"));
const Search = lazy(() => import("./pages/Search"));
import { NavigationProvider } from "./contexts/NavigationContext";
import { useGlobalHaptics } from "./hooks/useGlobalHaptics";

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <Suspense fallback={<PageSkeleton />}>
      <AnimatePresence mode="popLayout">
      {/* @ts-expect-error key on Routes */}
      <Routes location={location} key={location.pathname}>
        <Route index element={<Splash />} />
        <Route path="home" element={<Home />} />
        <Route path="service/:id" element={<ServiceDetail />} />
        <Route path="offer/:id" element={<OfferDetail />} />
        <Route path="search" element={<Search />} />
        <Route path="favorites" element={<GenericPage title="Favorites" />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default function App() {
  useGlobalHaptics();
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    const savedTheme = localStorage.getItem('theme-variant');
    if (savedTheme === 'slate') {
      document.documentElement.classList.add('theme-dark-slate');
    }
  }, []);

  return (
    <NavigationProvider>
      <BrowserRouter>
      <Layout>
        <OfflineOverlay />
        <AnimatedRoutes />
      </Layout>
    </BrowserRouter>
    </NavigationProvider>
  );
}
