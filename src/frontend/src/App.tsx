import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "@/pages/main/Main.tsx";

function App() {
  return (
    <>
        <Router>
            <Routes>
                {/* Front Pages */}
                <Route path="/" element={<Main />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
