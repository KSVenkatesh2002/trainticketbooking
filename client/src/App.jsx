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
import BookingRouter from './component/BookingRouter';
import HomeRouter from './component/HomeRouter';


function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                {/*  home page */}
                <Route  path="/"                 element={<HomeRouter/>} >
                    <Route  index element={<Home/>} />
                    <Route  path="/search"           element={<Search/>} />
                    <Route  path="/train-info"       element={<TrainInfo/>} />
                    <Route  element={<PrivateRouter />}>
                        <Route path="/pnr-status/:id" element={<PnrStatus />} /> {/* Dynamic Route */}
                        <Route path="/pnr-status" element={<PnrStatus />} /> {/* For form submission without ID */}
                        <Route  path="/my-booking"       element={<BookingList/>} />
                    </Route>
                </Route>

                {/* header */}
                <Route  path="/about"            element={<About/>} />
                <Route  path="/profile"          element={<Profile/>} />

                {/* auth routing */}
                <Route  path="/auth"      element={<Auth/>} >
                    <Route  path="signup"      element={<Signup/>} />
                    <Route  path="login"      element={<Login/>} />
                </Route>
                <Route  path="/train-list"       element={<TrainList/>} />
                
                <Route element={<PrivateRouter />}>
                    {/* Booking Routes */}
                    <Route path="/booking" element={<BookingRouter />}>
                        <Route index element={<Booking />} />  {/* Default child route */}
                        <Route path="payment" element={<Payment />} /> {/* Booking Payment */}
                    </Route>
                </Route>
                
            </Routes>
        </BrowserRouter>
    )
}

export default App
