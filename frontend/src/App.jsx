import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Marketplace from "./pages/Marketplace/Marketplace";
import UploadMaterial from "./pages/UploadMaterial/UploadMaterial";
import Impact from "./pages/Impact/Impact";
import Auth from "./pages/Auth/Auth";
import Profile from "./pages/Profile/Profile";
import MapView from "./pages/MapView/MapView";
import RequestMaterial from "./pages/RequestMaterial/RequestMaterial";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/upload" element={<UploadMaterial />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/request" element={<RequestMaterial />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
