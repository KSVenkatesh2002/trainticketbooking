import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Lazy loading components
const Header = lazy(() => import('./component/Header'));
const Home = () => import('./pages/Home');
const About = lazy(() => import('./pages/About'));
const Auth = lazy(() => import('./component/Auth'));
const Profile = lazy(() => import('./pages/Profile'));
const PrivateRouter = lazy(() => import('./component/PrivateRouter'));
const TrainList = lazy(() => import('./pages/TrainList'));
const Booking = lazy(() => import('./pages/booking_pages/Booking'));
const Payment = lazy(() => import('./pages/booking_pages/Payment'));
const TrainInfo = lazy(() => import('./pages/home_pages/TrainInfo'));
const PnrStatus = lazy(() => import('./pages/home_pages/PnrStatus'));
const BookingList = lazy(() => import('./pages/home_pages/BookingList'));
const Search = () => import('./pages/home_pages/Search');
const Signup = lazy(() => import('./pages/auth_pages/Signup'))
const Login = lazy(() => import('./pages/auth_pages/Login'));
const BookingRouter = lazy(() => import('./component/BookingRouter'));
const HomeRouter = lazy(() => import('./component/HomeRouter'));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div className=''>Loading...</div>}>
                <Header/>
                <Routes>
                    {/* home page */}
                    <Route path="/" element={<HomeRouter/>} >
                        <Route index element={<Home/>} />
                        <Route path="/search" element={<Search/>} />
                        <Route path="/train-info" element={<TrainInfo/>} />
                        <Route element={<PrivateRouter />}>
                            <Route path="/pnr-status/:id" element={<PnrStatus />} /> {/* Dynamic Route */}
                            <Route path="/pnr-status" element={<PnrStatus />} /> {/* For form submission without ID */}
                            <Route path="/my-booking" element={<BookingList/>} />
                        </Route>
                    </Route>

                    {/* header */}
                    <Route path="/about" element={<About/>} />
                    <Route path="/profile" element={<Profile/>} />

                    {/* auth routing */}
                    <Route path="/auth" element={<Auth/>} >
                        <Route path="signup" element={<Signup/>} />
                        <Route path="login" element={<Login/>} />
                    </Route>
                    <Route path="/train-list" element={<TrainList/>} />
                    
                    <Route element={<PrivateRouter />}>
                        {/* Booking Routes */}
                        <Route path="/booking" element={<BookingRouter />}>
                            <Route index element={<Booking />} />  {/* Default child route */}
                            <Route path="payment" element={<Payment />} /> {/* Booking Payment */}
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
