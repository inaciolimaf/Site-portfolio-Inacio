import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Inkstave invite links (/invite/<token>) belong to the app, not the portfolio.
// Done here, before React renders, so the NotFound page never flashes and it
// works regardless of which web server serves the build.
const INKSTAVE_ORIGIN = 'https://inkstave.inaciof.com'
const { pathname, search, hash } = window.location

if (pathname.startsWith('/invite/')) {
  window.location.replace(`${INKSTAVE_ORIGIN}${pathname}${search}${hash}`)
} else {
  createRoot(document.getElementById("root")!).render(<App />);
}
