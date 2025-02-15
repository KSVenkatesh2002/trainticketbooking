import React, { useState, useEffect, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import { setBooking } from '../redux/slices/trainSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faBan, faSpinner } from '@fortawesome/free-solid-svg-icons';


function TrainList() {
    const { currentTrainList, sourceName, destinationName, travelDate, } = useSelector((state) => state.train);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [date,setDate] = useState(new Date(travelDate))
    const [trainsOnDate,setTrainsOnDate] = useState(currentTrainList)
    const [availableSeats, setAvailableSeats] = useState({});
    const [seatsLoading, setSeatsLoading] = useState({});
    const [price, setPrice] = useState({});
    const [selectedClass, setSelectedClass] = useState('');
    // const [errorMsg, setErrorMsg] = useState(null)

    const weekNo = {
        Sun : 0,
        Mon : 1,
        Tue : 2,
        Wed : 3,
        Thu : 4,
        Fri : 5,
        Sat : 6
    }

    //getting train for requested date
    useEffect(() => {
        console.log('date',date.toISOString().split('T')[0])
        let list = [];
    
        currentTrainList.forEach(train => {
            train.daysOfOperation.forEach(day => {
                if (weekNo[day] === date.getDay()) {
                    list.push(train);
                }
            });
        });
    
        setTrainsOnDate(list);
    }, [date, currentTrainList]);

    // useEffect(() => {
    //     console.log('trains on date', trainsOnDate);
    // }, [trainsOnDate]);

    const handleAvailableSeats = async (trainId, travelDate, fromIndex, toIndex) => {
        setSeatsLoading(prevLoading => ({
            ...prevLoading,
            [trainId]: true
        }));
        try {
            const response = await fetch(`/api/train/available-seats?trainId=${trainId}&fromIndex=${fromIndex}&toIndex=${toIndex}&date=${travelDate}`);
            const data = await response.json();
    
            if (data.success) {
                setAvailableSeats(prevSeats => ({
                    ...prevSeats,
                    [trainId]: data.availableSeats // Store seats per train ID
                }));
            } else {
                console.log("Error fetching seats:", data.message);
            }
        } catch (error) {
            console.error("Error fetching available seats:", error);
        }
        setSeatsLoading(prevLoading => ({
            ...prevLoading,
            [trainId]: false
        }));
    };

    function handlePrice(t, cls){
        const price_per_km = t.coach_structure[cls].price_per_km
        const distance = t.stations[1].distance - t.stations[0].distance
        setPrice({[t._id]: price_per_km*distance})
    }

    async function bookTrain(id){
        dispatch(setBooking({train:id, class:selectedClass, date: date.toISOString().split('T')[0], price}))
        navigate('/booking')
    }


    

    return (
        <div className='flex flex-col h-[100vh] min-h-full items-center bg-orange-50 '>

            <div className="w-full flex justify-between md:max-w-[70vw]">
                <button
                    className="m-2 p-2 rounded border-b-4 border-black w-fit bg-orange-400 text-white"
                    onClick={() => {
                        setDate(new Date(date.getTime() - 24 * 60 * 60 * 1000)); // Fixed: Create a new date
                    }}
                >   <FontAwesomeIcon icon={faArrowLeft} />
                    Previous Date
                </button>
                <button
                    className="m-2 p-2 rounded border-b-4 border-black w-fit bg-orange-400 text-white"
                    onClick={() => {
                        setDate(new Date(date.getTime() + 24 * 60 * 60 * 1000)); // Fixed: Create a new date
                    }}
                >   Next Date
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>

            { trainsOnDate.length===0 ?
                <span className='text-xl p-2 text-red-600 '> 
                    <FontAwesomeIcon icon={faBan} /> Trains not available at this date, check other date
                </span> :
                <ol className='w-full p-2 md:max-w-[70vw]'>
                {trainsOnDate.map((t) => (
                    
                    <li key={t._id} className={`w-full flex border flex-col items-center mt-10 overflow-auto scroll-auto ${price[t._id] && 'shadow-lg shadow-orange-400/40'}`}>
                        

                        {/* train header */}
                        <div className='w-full bg-orange-200 text-blue-800'>
                            <div className='w-full text-center font-medium'>
                                <span className='mx-2'>{t.name}</span> | <span className='mx-2'>{t.number}</span>
                            </div>
                            <div className='w-full text-center'>{t.daysOfOperation.map(day => 
                                (<span key={day} className='mx-2'>{day}</span>))}
                            </div>
                        </div>

                        {/* location and time */}
                        <div className="flex flex-row justify-between bg-orange-100 w-full px-5 ">
                            <div>
                                <span className='font-bold'>{sourceName}</span>
                                <br />
                                <span>
                                    {t.stations[0]?.departure || "N/A"}
                                </span>
                            </div>

                            <div>
                                <span className='font-bold'>{destinationName}</span>
                                <br />
                                <span>
                                    {t.stations[1].arrival || "N/A"}
                                </span>
                            </div>
                        </div>
                        
                        {/* available seats */}
                        <div className='w-full text-center font-semibold bg-orange-200'>Available Seats</div>
                        <ol className='flex w-full p-2 bg-orange-200 text-blue-800 flex-row justify-around overflow-auto scroll-auto' 
                            onClick={() => handleAvailableSeats(t._id, date, t.stations[0].number, t.stations[1].number)}
                        >
                            
                            {availableSeats[t._id] ? (
                                Object.entries(availableSeats[t._id]).map(([cls, count]) => (

                                    <li key={cls} 
                                        className='p-2 border rounded bg-orange-100 hover:bg-orange-300' 
                                        onClick={()=>{
                                            setSelectedClass(cls)
                                            handlePrice(t, cls)}}
                                    >
                                        <div className='font-semibold text-orange-800'>{cls}</div>
                                        <div className='text-black '>{count} Seats</div>
                                    </li>
                                ))
                            ) : (
                                <li className='px-4 py-2 border rounded'>
                                    {seatsLoading[t._id] ? 
                                    <FontAwesomeIcon className='animate-spin' icon={faSpinner} /> :
                                    'Click to load seats'}
                                </li>
                            )}
                        </ol>
                        
                        {/* ticket price */}
                        {price[t._id] &&
                            <div className='w-full flex justify-center items-center'
                                onClick={()=>{bookTrain(t._id)}}
                            >
                                ₹{price[t._id]} <span className='flex justify-center items-center w-1/4 h-15 m-2 bg-orange-600 border border-orange-950 text-white rounded-2xl'>Book Now</span>
                            </div>
                        }
                    </li>))}
                </ol>
            }

            {/* {errorMsg && errorMsg} */}
        </div>
    )
}

export default TrainList