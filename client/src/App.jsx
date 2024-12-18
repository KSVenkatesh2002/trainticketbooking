import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Home from './pages/Home';
import About from './pages/About';
import './css/App.module.css'


function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
