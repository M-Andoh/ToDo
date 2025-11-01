import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Main from './components/Main.js';

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
      <StrictMode>
            <Main />
      </StrictMode>
);