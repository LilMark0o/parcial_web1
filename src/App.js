import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ListadoRobots from "./pages/ListadoRobots";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/listaRobots" element={<ListadoRobots />} />
            </Routes>
        </Router>
    );
}

export default App;