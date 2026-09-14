import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import './styles/tokens.css';
import './styles/fonts.css';
import './styles/global.css';
import './styles/chrome.css';
import './styles/ui.css';
import './styles/sections.css';
import './styles/overlay.css';
import './styles/responsive.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
