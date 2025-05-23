import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => <h1>Electron + React + TypeScript Renderer</h1>;

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
