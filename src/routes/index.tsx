import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Home } from '../pages/Home';
import { Search } from '../pages/Search';
import { LikedTactics } from '../pages/LikedTactics';
import { TacticsStyle } from '../pages/TacticsStyle';
import { PlaylistPage } from '../pages/PlaylistPage';
import { DecadePage } from '../pages/DecadePage';
import { TermsOfService } from '../pages/TermsOfService';
import { PrivacyPolicy } from '../pages/PrivacyPolicy';
import { CookiePolicy } from '../pages/CookiePolicy';
import { Contact } from '../pages/Contact';
import { About } from '../pages/About';
import { ShareCode } from '../pages/ShareCode';
import { Advertise } from '../pages/Advertise';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="liked" element={<LikedTactics />} />
        <Route path="playlist/:id" element={<PlaylistPage />} />
        <Route path="style/:tag" element={<TacticsStyle />} />
        <Route path="decade/:decade" element={<DecadePage />} />
        <Route path="terms" element={<TermsOfService />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="cookies" element={<CookiePolicy />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="share" element={<ShareCode />} />
        <Route path="advertise" element={<Advertise />} />
      </Route>
    </Routes>
  );
};