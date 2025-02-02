import React, { useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { setBooking } from '../redux/slices/trainSlice';
import { useDispatch, useSelector } from 'react-redux';


function SearchResult() {
    const { currentTrainList, sourceName, destinationName, travelDate, } = useSelector((state) => state.train);
    const navigate = useNavigate();
    const dispatch = useDispatch();

//      currentTrainList = [{
//     "_id": "T1001",
//     "name": "Chennai Express",
//     "number": "12623",
//     "source": "Chennai",
//     "destination": "Mumbai",
//     "departureTime": "18:30",
//     "arrivalTime": "08:00",
//     "duration": "13h 30m",
//     "daysOfOperation": ["Mon", "Wed", "Fri"],
//     "seatsAvailable": { "sleeper": 50, "AC3Tier": 30, "AC2Tier": 20 },
//     "fare": { "sleeper": 500, "AC3Tier": 1200, "AC2Tier": 1800 },
//     "stops": [
//       { "station": "Chennai", "arrival": "-", "departure": "18:30" },
//       { "station": "Bangalore", "arrival": "22:00", "departure": "22:15" },
//       { "station": "Pune", "arrival": "04:30", "departure": "04:45" },
//       { "station": "Mumbai", "arrival": "08:00", "departure": "-" }
//     ]
//   }, others...]
    
    const travelWeek  = new Date(travelDate).getDay()

    const classes = [['sleeper','SLP'],['AC2Tier','AC2'],['AC3Tier','AC3'],['chairCar','CC'],['executive','EXE']]


    const weekNo = {
        Sun : 0,
        Mon : 1,
        Tue : 2,
        Wed : 3,
        Thu : 4,
        Fri : 5,
        Sat : 6
    }

    const [availableTrainsOnDate,setAvailableTrainsOnDate] = useState([])
    const [availableTrainsOnOtherDate,setAvailableTrainsOnOtherDate] = useState([])
    const [selected,setSelected] = useState()
    
    //seapare available trains on given and other date
    useEffect(() => {
        const trainsOnDate = [];
        const trainsOnOtherDate = [];

        currentTrainList.forEach(train => {
            if (
                train.daysOfOperation.includes('Daily') ||
                train.daysOfOperation.some(day => weekNo[day] === travelWeek)
            ) {
                trainsOnDate.push(train);
            } else {
                trainsOnOtherDate.push(train);
            }
        });

        setAvailableTrainsOnDate(trainsOnDate);
        setAvailableTrainsOnOtherDate(trainsOnOtherDate);
    }, [currentTrainList, travelDate]);


    
    //find all travel dates
    function giveMyTenDate(weeks) {
        let urWeekDate = [];
        const startDate = new Date(travelDate); // Start from travelDate

        if (weeks.includes('Daily')) {
            for (let i = 0; i < 10; i++) {
                const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
                urWeekDate.push(date.toISOString().split('T')[0]);
            }
        } else {
            const operationDays = weeks.map(day => weekNo[day]);
            let currentDate = new Date(startDate);

            while (urWeekDate.length < 10) {
                if (operationDays.includes(currentDate.getDay())) {
                    urWeekDate.push(currentDate.toISOString().split('T')[0]);
                }
                currentDate.setDate(currentDate.getDate() + 1); // Move to next day
            }
        }
        return urWeekDate;
    }

    async function handleOnClickSelect(e)  {
        console.log(e)
        dispatch(setBooking({train:e.trainId,class:e.class,date:e.date}))
        navigate('/booking')
    }

    return (
        <div className='flex flex-col w-screen items-center'>

            <h2 className='m-2 p-2 rounded-2xl w-fit bg-orange-400 text-white'>Trains Available on  
                <span className='font-bold ml-2 text-indigo-800'>{travelDate}
                </span>
            </h2>
            <span className=' text-2xl font-bold p-2 text-blue-600'>
                { availableTrainsOnDate.length!==0 ? '' : 'trains not available at this date, check other date'}
            </span>
            <ol className='w-full'>
            {availableTrainsOnDate.concat(availableTrainsOnOtherDate).map((t, index) => (
                
                <li key={t._id} className='flex flex-col items-center mt-5 w-full '>
                    {index === availableTrainsOnDate.length &&
                    <h2 className='m-2 p-2 rounded-2xl w-fit bg-orange-300 '>Other Available Trains</h2>
                    }

                    {/* train header */}
                    <div>
                        <div>
                            <span className='mx-2'>{t.name}</span> | <span className='mx-2'>{t.number}</span>
                        </div>
                        <div>{t.daysOfOperation.map(day => 
                            (<span key={day} className='mx-2'>{day}</span>))}
                        </div>
                    </div>

                    {/* location and time */}
                    <div className='flex flex-row justify-between w-full px-5'>
                        <div>
                            <span>{sourceName}</span><br />
                            <span>({t.stops.find(stop => stop.station === sourceName)?.departure })</span><br />
                        </div>
                        <div>
                            <span>{destinationName}</span><br />
                            <span>({t.stops.find(stop => stop.station === destinationName)?.arrival})</span><br />
                        </div>
                    </div>
                    
                    {/* show date wise available seats */}
                    <div className='flex w-full flex-row items-center overflow-y-auto px-5'>
                        
                        <span>Available <br /> seats</span>
                        <ol className='flex '>{giveMyTenDate(t.daysOfOperation).map((date) => (
                            
                            // container for each day 
                            <li key={date} className='m-2 w-[140px] '>
                                <div className='border p-1 mb-1 text-center'>{date}</div>

                                {/* single date with all classes*/}
                                <ol className='flex justify-between'>
                                    {classes.map(([key, label]) => (
                                        t.seatsAvailable[key] && (
                                            <li 
                                                key={key} 
                                                onClick={(e)=>{handleOnClickSelect({
                                                    trainId : t._id,
                                                    date,
                                                    class:key
                                                })}}
                                                className='border px-1'
                                            >
                                                <ol>
                                                    <li>{label}</li>
                                                    <li>{t.seatsAvailable[key]}</li>
                                                </ol>
                                            </li>
                                        )
                                    ))}
                                </ol>  
                            </li>
                        ))}</ol>
                    </div>

                    {/* show fare price for each class */}
                    <div className='flex w-full flex-row items-center overflow-y-auto px-5'>
                        <span>Fare</span>
                        <ol className='flex '>
                            {classes.map(([key, label]) => (
                                
                                t.fare[key] && (
                                    <li key={key} className='m-2 w-[140px] '>
                                        <div className='border p-1 mb-1 text-center'>{label}</div>
                                        <div className='border p-1 mb-1 text-center'>{t.fare[key]}</div>
                                    </li>
                                )
                            ))}
                        </ol>
                    </div>


                </li>))}
            </ol>
            

            
            <hr className='w-full m-5 border h-0' />

        </div>
    )
}

export default SearchResult