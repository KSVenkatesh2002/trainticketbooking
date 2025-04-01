import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faCodeCommit, faSearch, faTrain } from '@fortawesome/free-solid-svg-icons';

function Home() {
    const location = useLocation();
    const [nav,setNav] = useState('')
    const route = location.pathname.split('/')[location.pathname.split('/').length-1]
    useEffect(()=>{
        setNav(route)
    },[route])
    
//
    return (
        <div className="flex flex-col items-center w-full min-h-screen h-fit bg-gray-900 text-white">
            <div className='w-full min-h-[50px] py-4 flex justify-evenly items-center bg-gray-800 shadow-lg shadow-black/50'>
                <div className={`flex justify-evenly items-center  p-1 h-9/10 rounded-2xl w-1/5 text-center hover:underline ${nav==='search' && 'shadow-sm shadow-white/50' }`}>
                    <Link to='/search' className={`text-orange-300 ${nav === 'search' && 'text-orange-600' } font-semibold`}>
                        <FontAwesomeIcon icon={faSearch} className={` text-3xl block md:hidden`} /><br />
                        <span className="hidden md:inline">Search</span>
                    </Link>
                </div>

                <div className={`flex justify-evenly items-center  p-1 h-9/10 rounded-2xl w-1/5 text-center hover:underline ${nav==='pnr-status' && 'shadow-sm shadow-white/50' }`}>
                    <Link to='/pnr-status' className={`text-orange-200 ${nav === 'pnr-status' && 'text-orange-600' } font-semibold `} >
                        <FontAwesomeIcon icon={faCodeCommit} className=" text-3xl block md:hidden" /><br />
                        <span className="hidden md:inline">PNR status</span>
                    </Link>
                </div>

                <div className={`flex justify-evenly items-center  p-1 h-9/10 rounded-2xl w-1/5 text-center hover:underline ${nav==='train-info' && 'shadow-sm shadow-white/50' }`}>
                    <Link to='/train-info' className={`text-orange-200 ${nav === 'train-info' && 'text-orange-600' } font-semibold `}>
                        <FontAwesomeIcon icon={faTrain} className=" text-3xl bloctext-3xl k md:hidden" /><br />
                        <span className="hidden md:inline">Train info</span>
                    </Link>
                </div>

                <div className={`flex justify-evenly items-center  p-1 h-9/10 rounded-2xl w-1/5 text-center hover:underline ${nav==='my-booking' && 'shadow-sm shadow-white/50' }`}>
                    <Link to='/my-booking' className={`text-orange-200 ${nav === 'my-booking' && 'text-orange-600' } font-semibold `}>
                        <FontAwesomeIcon icon={faClipboardList} className=" text-3xl block md:hidden" /><br />
                        <span className="hidden md:inline">Booking list</span>
                    </Link>
                </div>
            </div>
            <Outlet/>
        </div>
    )
}
export default Home