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
        <div className="flex flex-col items-center h-full min-h-screen w-full">


            <div className='w-full h-[10vh] md:h-[12vh] min-h-[50px] mt-5 flex justify-evenly items-center'>
                <div className='flex justify-evenly items-center bg-gray-100 h-9/10 rounded-2xl w-1/5 text-center hover:underline'>
                    <Link to='/search' className={`text-orange-200 ${nav === 'search' && 'text-orange-600' } font-semibold`}>
                        <FontAwesomeIcon icon={faSearch} className={`hover:text-4xl text-3xl block md:hidden`} /><br />
                        <span className="hidden md:inline">Search</span>
                    </Link>
                </div>

                <div className='flex justify-evenly items-center bg-gray-100 h-9/10 rounded-2xl w-1/5 text-center hover:underline'>
                    <Link to='/pnr-status' className={`text-orange-200 ${nav === 'pnr-status' && 'text-orange-600' } font-semibold `} >
                        <FontAwesomeIcon icon={faCodeCommit} className="hover:text-4xl text-3xl block md:hidden" /><br />
                        <span className="hidden md:inline">PNR status</span>
                    </Link>
                </div>

                <div className='flex justify-evenly items-center bg-gray-100 h-9/10 rounded-2xl w-1/5 text-center hover:underline'>
                    <Link to='/train-info' className={`text-orange-200 ${nav === 'train-info' && 'text-orange-600' } font-semibold `}>
                        <FontAwesomeIcon icon={faTrain} className="hover:text-4xl text-3xl bloctext-3xl k md:hidden" /><br />
                        <span className="hidden md:inline">Train info</span>
                    </Link>
                </div>

                <div className='flex justify-evenly items-center bg-gray-100 h-9/10 rounded-2xl w-1/5 text-center hover:underline'>
                    <Link to='/my-booking' className={`text-orange-200 ${nav === 'my-booking' && 'text-orange-600' } font-semibold `}>
                        <FontAwesomeIcon icon={faClipboardList} className="hover:text-4xl text-3xl block md:hidden" /><br />
                        <span className="hidden md:inline">Booking list</span>
                    </Link>
                </div>
            </div>

            <hr className='border w-9/10 mt-4' />


            

            <Outlet/>
            
            
        </div>
    )
}
export default Home