import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Home from './pages/Home';
import About from './pages/About';
import Auth from './pages/Auth';
import './css/App.css'


function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/auth/:types" element={<Auth />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
