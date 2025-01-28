import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Home from './pages/Home';
import About from './pages/About';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import PrivateRouter from './component/PrivateRouter';
import './css/App.css';


function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/"            element={<Home    />} />
                <Route path="/about"       element={<About   />} />
                <Route path="/auth/:types" element={<Auth    />} />
                <Route element={<PrivateRouter />}>
                    <Route path="/profile"     element={<Profile />} />
                </Route>
                
            </Routes>
        </BrowserRouter>
    )
}

export default App
