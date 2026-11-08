import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CaseInkstave from "./pages/CaseInkstave";
import Links from "./pages/Links";
import NotFound from "./pages/NotFound";
import { LocaleProvider } from "@/context/LocaleContext";
import { MotionPrefsProvider } from "@/context/MotionPrefs";

const App = () => (
  <LocaleProvider>
    <MotionPrefsProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/inkstave" element={<CaseInkstave />} />
        <Route path="/links" element={<Links />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </MotionPrefsProvider>
  </LocaleProvider>
);

export default App;
