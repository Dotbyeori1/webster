import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Layout/Footer";
import Navbar from "./components/Layout/Navbar";
import SidebarSettings from "./components/Layout/SidebarSettings";
import GoTop from "./components/Layout/GoTop";

// Pages
import Home from "./pages/Home";
import Features from "./pages/Features";
import UseCases from "./pages/UseCases";
//import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import Calendar from "./pages/Calendar";

function App() {
  return (
    <>
        <Router>
            <Navbar />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/use-cases" element={<UseCases />} />
                    <Route path="/pricing" element={<Calendar />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>

            <Footer />

            <SidebarSettings />

            <GoTop />
        </Router>
    </>
  )
}

export default App;
