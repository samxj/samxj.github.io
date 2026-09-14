import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Nav } from '../components/core/Nav.jsx';
import { Footer } from '../components/core/Footer.jsx';
import { Home } from '../ui_kits/portfolio/Home.jsx';
import { About } from '../ui_kits/portfolio/About.jsx';
import { Work } from '../ui_kits/portfolio/Work.jsx';
import { Resume } from '../ui_kits/portfolio/Resume.jsx';
import { Contact } from '../ui_kits/portfolio/Contact.jsx';

const EMAIL = 'hello@samfield.co';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Resume', href: '/resume' },
];

function Shell() {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const goTo = (key) => navigate(key.startsWith('/') ? key : '/' + key);

  return (
    <>
      <Nav active={location.pathname} links={NAV_LINKS} onNavigate={goTo} />
      <Routes>
        <Route path="/" element={<Home onNavigate={goTo} />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home onNavigate={goTo} />} />
      </Routes>
      <Footer email={EMAIL} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
