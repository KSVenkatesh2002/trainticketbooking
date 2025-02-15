import { setPassengerList, setContactDetails, setDisplayForm, setDisplayContactForm, setPnr} from '../redux/slices/trainSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faFloppyDisk, faSpinner, faTrash, faUserCheck, faUserEdit, faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Booking() {
    const { 
        currentTrainList, bookingTrain, 
        sourceName, destinationName, 
        finalDate, selectedClass,
        passengerList, contactDetails,
        displayForm, displayContactForm, currentBookingPnr
    } = useSelector((state) => state.train);

    const { currentUser } = useSelector((state) => state.user)

    const [loading, setLoading] =  useState(false)
    const [error, setError] =  useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const t = currentTrainList.filter(train => train._id === bookingTrain)[0]

    const handleBookTicket = async () => {
        setLoading(true)
        setError('')
        const body = {
            user_id : currentUser._id,
            train_id: bookingTrain,
            selectedClass,
            date: finalDate,
            seats_per_coach: t.coach_structure[selectedClass].seats_per_coach,
            from_station:{
                name: sourceName,
                no: t.stations[0].number,
            },
            to_station:{
                name: destinationName,
                no: t.stations[1].number
            },
            contactDetails
        }
        let data;
        //console.log('body',body)
        try{
            for (let passenger of passengerList) {
                try {
                    const res = await fetch('/api/train/book-ticket',{
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify({ ...body, passenger }),
                    })
                    data = await res.json()
                    console.log('after booking',data)
                    if(data.success)    {
                        dispatch(setPnr([...currentBookingPnr, data.pnr]))
                    }
                    else {
                        console.log('error',data)
                        setError(data.message)
                    }

                }catch (e) {
                    setError(e.message)
                    console.log('error',e)
                }
            }
            if(data.success)    {
                navigate('/booking/payment')
            }
            
        }catch(e){
            setError(e.message)
            console.log('error',e)
        }
        setLoading(false)
    }

    return (
        <div className='min-h-screen h-full p-3 w-full flex flex-col justify-center items-center overflow-hidde'>

            {/* show train data */}
            <div className='flex flex-col items-center mt-2 mb-5 w-full bg-white rounded-lg md:w-1/2'>
                {/* train header */}
                <div>
                    <div className='font-semibold text-2xl'>
                        <span className='mx-2'>{t.name}</span> | <span className='mx-2'>{t.number}</span>
                    </div>
                    <div className='text-center font-medium'>
                        <span className='mx-2'>{finalDate}</span> | <span className='mx-2'>{selectedClass}</span>
                    </div>
                </div>

                {/* location and time */}
                <div className='flex flex-row justify-between w-full px-5 '>
                    <div>
                        <span className='font-medium'>{sourceName}</span><br />
                        <span className='font-light'>({t.stations[0].departure })</span><br />
                    </div>
                    <div>
                        <span className='font-medium'>{destinationName}</span><br />
                        <span className='font-light'>({t.stations[1].arrival})</span><br />
                    </div>
                </div>
            </div>

            {/* passenger and contact */}
            <div className='flex flex-col items-center w-full md:flex-row md:justify-evenly'>
                
                {/*  passenger */}
                <div className='flex flex-col items-center w-full md:w-4/9 my-2'>

                    <div className='mb-2 self-start text-lg font-bold'>Passenger(s) Details</div>

                    {/* Passenger Form */}
                    {displayForm && <form 
                        className='rounded-lg mb-3 w-full md:flex-row md:flex-wrap p-4 bg-white shadow-md flex flex-col justify-around'
                        onSubmit={(e) => {
                            e.preventDefault();
                            const passenger = {
                                name: e.target.name.value.toLowerCase(),
                                age: e.target.age.value,
                                gender: e.target.gender.value,
                                birth: e.target.birth.value
                            };
                            dispatch(setPassengerList([...passengerList, passenger]));
                            e.target.reset();
                        }}>
                        <label className='mb-2 md:w-2/5'>
                            <span className='text-sm'>Name:</span><br />
                            <input className='w-full  p-1 border border-gray-300 rounded' type="text" name="name" required />
                        </label>
                        <label className='mb-2 md:w-2/5'>
                            <span className='text-sm'>Age:</span><br />
                            <input className='w-full  min-w-2/5 p-1 border border-gray-300 rounded' type="number" name="age" min='0' max='100' required />
                        </label>
                        <label className='mb-4 md:w-2/5'>
                            <span className='text-sm'>Gender:</span><br />
                            <select className='w-full  p-1 border border-gray-300 rounded' type="text" name="gender" required>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </label>
                        <label className='mb-4 md:w-2/5'>
                            <span className='text-sm'>Birth Preference:</span><br />
                            <select className='w-full  p-1 border border-gray-300 rounded' type="text" name="birth" required>
                                <option value="lower">Lower</option>
                                <option value="middle">Middle</option>
                                <option value="upper">Upper</option>
                                <option value="sideLower">Side Lower</option>
                                <option value="sideUpper">Side Upper</option>
                            </select>
                        </label>
                        <button type="submit" className='flex items-center justify-center bg-blue-500 text-white p-2 rounded-lg md:w-2/5'>
                            <FontAwesomeIcon className='mr-2' icon={faCheck} /> Add Passenger
                        </button>
                    </form>}

                    {/* Display Passenger List */}
                    {passengerList.length > 0 && <div className='flex justify-between items-center  bg-white p-3 mb-2 rounded-lg w-full '>
                        <table className='w-full border-collapse border border-gray-400 text-center'>
                            <tbody className='w-ful'>
                            <tr className='h-20'>
                                <th className='border border-gray-300 w-6/18 p-2 bg-orange-400'>Name</th>
                                <th className='border border-gray-300 w-2/18 p-2 bg-orange-400'>Age</th>
                                <th className='border border-gray-300 w-4/18 p-2 bg-orange-400'>Gender</th>
                                <th className='border border-gray-300 w-4/18 p-2 bg-orange-400'>Birth</th>
                                <th className='border border-gray-300 w-2/18 p-2 bg-orange-400'><FontAwesomeIcon icon={faTrash}/> </th>
                            </tr>
                            {passengerList.map((passenger, index) => (
                            <tr className='h-15'>
                                <td className='border border-gray-300 px-2'>{passenger.name}</td>
                                <td className='border border-gray-300 px-2'>{passenger.age}</td>
                                <td className='border border-gray-300 px-2'>{passenger.gender}</td>
                                <td className='border border-gray-300 px-2'>{passenger.birth}</td>
                                <td className='border border-gray-300 px-2'><FontAwesomeIcon
                                    className='cursor-pointer text-red-500'
                                    icon={faUserMinus}
                                    onClick={() => {
                                        const updatedList = passengerList.filter((_, i) => i !== index);
                                        dispatch(setPassengerList(updatedList));
                                    }}
                                /></td>
                            </tr>
                            )) }
                            </tbody>
                        </table>
                    </div>}
                    

                    {/* Submit All Passengers Button */}
                    {displayForm && passengerList.length > 0 && <button 
                        className='flex items-center justify-center w-full bg-green-500 text-white rounded-lg p-2 mt-2 md:w-5/11'
                        onClick={() => {
                            if(passengerList.length) {
                                dispatch(setDisplayForm())
                                alert('Passenger details submitted successfully!');
                            }else{
                                alert('Must enter one passenger!');
                            }
                        }}
                    >
                        <FontAwesomeIcon className='mr-2' icon={faUserCheck} /> Submit All Passengers
                    </button>}

                    {/* add passengers again */}
                    {displayForm || <button 
                        className='flex items-center justify-center w-full bg-black text-white rounded-lg p-2 mt-2 md:w-5/11'
                        onClick={() => {
                                dispatch(setDisplayForm())
                        }}
                    >
                        <FontAwesomeIcon className='mr-2' icon={faUserPlus} /> Add more passenger
                    </button>}
                </div>

                {/*  contact data */}
                <div className='flex flex-col items-center w-full md:w-4/9 my-2 justify-center'>

                    <div className='mb-2 self-start text-lg font-bold'>Contact Details</div>

                    {displayContactForm && 
                    <form 
                        className='rounded-lg mb-3 w-full  md:flex-row md:flex-wrap p-4 bg-white shadow-md flex flex-col justify-around'
                        onSubmit={(e) => {
                            e.preventDefault();
                            dispatch(setDisplayContactForm())
                        }}>
                        <label className='mb-2 md:w-2/5'>
                            <span className='text-sm'>Name:</span><br />
                            <input 
                                className='w-full  p-1 border border-gray-300 rounded' 
                                type="text" 
                                name="name" 
                                value={contactDetails.name} 
                                onChange={(e)=>{
                                    dispatch(
                                        setContactDetails({
                                            ...contactDetails, 
                                            [e.target.name]: e.target.value.toLowerCase()
                                        })
                                    )
                                }} 
                                required />
                        </label>
                        <label className='mb-2 md:w-2/5'>
                            <span className='text-sm'>Email</span><br />
                            <input 
                                className='w-full  min-w-2/5 p-1 border border-gray-300 rounded' 
                                type="Email" 
                                name="email" 
                                value={contactDetails.email} 
                                onChange={(e)=>{
                                    dispatch(
                                        setContactDetails({
                                            ...contactDetails, 
                                            [e.target.name]: e.target.value
                                        })
                                    )
                                }}
                                required />
                        </label>
                        <label className='mb-2 md:w-2/5'>
                            <span className='text-sm'>Phone No:</span><br />
                            <div className='w-full'>
                                <div className='w-2/12 p-1 border border-gray-200 rounded-l inline-block text-center bg-gray-400'>91</div>
                                <input 
                                    className='w-10/12 min-w-2/5 p-1 border border-gray-300 rounded-r' 
                                    type="tel" 
                                    name="phoneno" 
                                    pattern="[0-9]{10}" 
                                    value={contactDetails.phoneno} 
                                    onChange={(e)=>{
                                        dispatch(
                                            setContactDetails({
                                                ...contactDetails, 
                                                [e.target.name]: e.target.value
                                                })
                                            )
                                        }}
                                    required />
                            </div>
                        </label>
                        
                        
                        <button type="submit" className='flex items-center justify-center bg-blue-500 text-white p-2 rounded-lg md:w-2/5'>
                            <FontAwesomeIcon className='mr-2' icon={faFloppyDisk} /> Save
                        </button>
                    </form>}

                    {/* Display contact details */}
                        
                    {!displayContactForm && <div className='w-full flex justify-between items-center bg-white p-3 mb-2 rounded-lg'>

                        <table className='w-full border-collapse border border-gray-400 text-center'>
                            <tbody>
                            <tr>
                                <th className='border border-gray-300 w-4/18 p-2 bg-orange-400'>Name</th>
                                <td className='border border-gray-300 px-2 p-1'>{contactDetails.name}</td>
                            </tr>
                            
                            <tr>
                                <th className='border border-gray-300 w-4/18 p-2 bg-orange-400'>Email</th>
                                <td className='border border-gray-300 px-2 p-1'>{contactDetails.email}</td>
                            </tr>
                            <tr>
                                <th className='border border-gray-300 w-4/18 p-2 bg-orange-400'>Phone</th>
                                <td className='border border-gray-300 px-2 p-1'>{contactDetails.phoneno}</td>
                            </tr> 
                            </tbody>
                        </table>
                        <FontAwesomeIcon
                            className='cursor-pointer text-red-500 ml-1'
                            icon={faUserEdit}
                            onClick={() => {
                                dispatch(setDisplayContactForm());
                            }}
                        />
                    </div>}

                </div>
            </div>
            
            {/* error */}
            {error}

            {/* book button */}
            {passengerList.length !== 0 && Object.keys(contactDetails).length !== 0 &&
                <button 
                    onClick={()=>{handleBookTicket()}} 
                    className={` p-3 rounded-2xl  font-bold shadow-lg shadow-orange-500/50 ${loading ? 'bg-orange-200 text-gray-400' : 'bg-orange-500 text-white'}`}
                >
                    {
                        loading
                        ? <>
                            Processing
                            <FontAwesomeIcon className='animate-spin' icon={faSpinner} />
                        </>
                        : 'Go To Payment'
                    }
                    
                </button>
            }
        </div>
    );
}
