import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Home from './pages/Home';
import About from './pages/About';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import PrivateRouter from './component/PrivateRouter';
import './css/App.css';
import SearchResult from './pages/SearchResult';
import Booking from './pages/Booking';


function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/auth/:types" element={<Auth/>} />
                <Route element={<PrivateRouter />}>
                    <Route path="/profile"     element={<Profile/>} />
                </Route>
                <Route path="/searchresult" element={<SearchResult/>} />
                <Route path='booking' element={<Booking/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
