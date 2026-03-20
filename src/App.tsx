import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PhoneFrame } from './components/PhoneFrame';
import { HomeScreen } from './screens/HomeScreen';
import { BranchProfileScreen } from './screens/BranchProfileScreen';
import { QueueScreen } from './screens/QueueScreen';
import { MerchantDashboard } from './screens/MerchantDashboard';
import { BookingsScreen } from './screens/BookingsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { MapScreen } from './screens/MapScreen';
import { LoyaltyScreen } from './screens/LoyaltyScreen';
import { CategoriesScreen } from './screens/CategoriesScreen';
import { CategoryDetailScreen } from './screens/CategoryDetailScreen';
import { SettingsDetailScreen } from './screens/SettingsDetailScreen';
import { LanguageSelectionScreen } from './screens/LanguageSelectionScreen';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <PhoneFrame>
          <Routes>
            {/* Initial Route */}
            <Route path="/welcome" element={<LanguageSelectionScreen />} />
            
            {/* Customer Routes */}
            <Route path="/" element={<HomeWrapper />} />
            <Route path="/branch/:id" element={<BranchProfileScreen />} />
            <Route path="/category/:category" element={<CategoryDetailScreen />} />
            <Route path="/settings/:type" element={<SettingsDetailScreen />} />
            <Route path="/queue/:id" element={<QueueScreen />} />
            <Route path="/queue" element={<QueueScreen />} />
            <Route path="/bookings" element={<BookingsScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/notifications" element={<NotificationsScreen />} />
            <Route path="/map" element={<MapScreen />} />
            <Route path="/loyalty" element={<LoyaltyScreen />} />
            <Route path="/categories" element={<CategoriesScreen />} />
            
            {/* Merchant Routes */}
            <Route path="/merchant" element={<MerchantDashboard />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </PhoneFrame>
      </Router>
    </LanguageProvider>
  );
}

const HomeWrapper = () => {
  const isLanguageSelected = localStorage.getItem('language_selected') === 'true';
  return isLanguageSelected ? <HomeScreen /> : <Navigate to="/welcome" />;
};
