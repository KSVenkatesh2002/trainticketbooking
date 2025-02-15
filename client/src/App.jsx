import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Home from './pages/Home';
import About from './pages/About';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import PrivateRouter from './component/PrivateRouter';
import './css/App.css';
import TrainList from './pages/TrainList';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import TrainInfo from './pages/TrainInfo';
import PnrStatus from './pages/PnrStatus';
import BookingList from './pages/BookingList';
import Search from './pages/Search';
import Signup from './pages/Signup';
import Login from './pages/Login';


function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route  path="/"                 element={<Home/>} >
                    <Route  path="/search"           element={<Search/>} />
                    <Route  path="/train-info"       element={<TrainInfo/>} />
                    <Route  element={<PrivateRouter />}>
                        <Route  path="/pnr-status"       element={<PnrStatus/>} />
                        <Route  path="/my-booking"       element={<BookingList/>} />
                    </Route>
                </Route>
                <Route  path="/about"            element={<About/>} />
                <Route  path="/auth"      element={<Auth/>} >
                    <Route  path="signup"      element={<Signup/>} />
                    <Route  path="login"      element={<Login/>} />
                </Route>
                <Route  path="/train-list"       element={<TrainList/>} />

                <Route  element={<PrivateRouter />}>
                    <Route  path="/profile"          element={<Profile/>} />
                    <Route  path='/booking'          element={<Booking/>} />
                    <Route  path='/booking/payment'  element={<Payment/>} />
                </Route>
                
                
            </Routes>
        </BrowserRouter>
    )
}

export default App
