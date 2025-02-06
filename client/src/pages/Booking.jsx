import { setDetails } from '../redux/slices/trainSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faFloppyDisk, faTrash, faUserCheck, faUserEdit, faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Booking() {
    const { currentTrainList, bookingTrain, sourceName, destinationName, finalDate, selectedClass } = useSelector((state) => state.train);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const t = currentTrainList.filter(train => train._id === bookingTrain)[0]
    const [passengerList,setPassengerList] = useState([]);
    const [displayForm,setDisplayForm] = useState(true);

    const [contactDetails,setContactDetails] = useState({})
    const [displayContactForm,setDisplayContactForm] = useState(true);

    return (
        <div className='bg-gray-200 min-h-full p-3 w-full flex flex-col justify-center items-center overflow-hidden'>

            {/* show train data */}
            <div className='flex flex-col items-center mt-2 mb-5 w-full bg-white shadow-md rounded-lg md:w-7/10'>
                {/* train header */}
                <div>
                    <div>
                        <span className='mx-2'>{t.name}</span> | <span className='mx-2'>{t.number}</span>
                    </div>
                    <div className='text-center'>
                        <span className='mx-2'>{finalDate}</span> | <span className='mx-2'>{selectedClass}</span>
                    </div>
                </div>

                {/* location and time */}
                <div className='flex flex-row justify-between w-full px-5 '>
                    <div>
                        <span>{sourceName}</span><br />
                        <span>({t.stops.find(stop => stop.station === sourceName)?.departure })</span><br />
                    </div>
                    <div>
                        <span>{destinationName}</span><br />
                        <span>({t.stops.find(stop => stop.station === destinationName)?.arrival})</span><br />
                    </div>
                </div>
            </div>

            {/*  passenger */}
            <div className='flex flex-col items-center w-full md:w-7/10 my-2'>

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
                        setPassengerList([...passengerList, passenger]);
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
                        <select className='w-full  p-1 border border-gray-300 rounded'  name="gender" required>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                    <label className='mb-4 md:w-2/5'>
                        <span className='text-sm'>Birth Preference:</span><br />
                        <select className='w-full  p-1 border border-gray-300 rounded'  name="birth" required>
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
                {passengerList.length > 0 && <div className='flex justify-between items-center shadow-md bg-white p-3 mb-2 rounded-lg w-full md:w-5/11'>
                    <table className='w-full border-collapse border border-gray-400 text-center'>
                        <tr>
                            <th className='border border-gray-300 w-4/18'>Name</th>
                            <th className='border border-gray-300 w-4/18'>Age</th>
                            <th className='border border-gray-300 w-4/18'>Gender</th>
                            <th className='border border-gray-300 w-4/18'>Birth</th>
                            <th className='border border-gray-300 w-2/18'><FontAwesomeIcon icon={faTrash}/> </th>
                        </tr>
                        {passengerList.map((passenger, index) => (
                        <tr>
                            <td className='border border-gray-300'>{passenger.name}</td>
                            <td className='border border-gray-300'>{passenger.age}</td>
                            <td className='border border-gray-300'>{passenger.gender}</td>
                            <td className='border border-gray-300'>{passenger.birth}</td>
                            <td className='border border-gray-300'><FontAwesomeIcon
                                className='cursor-pointer text-red-500'
                                icon={faUserMinus}
                                onClick={() => {
                                    const updatedList = passengerList.filter((_, i) => i !== index);
                                    setPassengerList(updatedList);
                                }}
                            /></td>
                        </tr>
                        )) }
                    </table>
                </div>}
                

                {/* Submit All Passengers Button */}
                {displayForm && passengerList.length > 0 && <button 
                    className='flex items-center justify-center w-full bg-green-500 text-white rounded-lg p-2 mt-2 md:w-5/11'
                    onClick={() => {
                        if(passengerList.length) {
                            setDisplayForm(false)
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
                            setDisplayForm(true)
                    }}
                >
                    <FontAwesomeIcon className='mr-2' icon={faUserPlus} /> Add more passenger
                </button>}
            </div>

            {/*  contact data */}
            <div className='flex flex-col items-center w-full md:w-7/10 my-2 justify-center'>

                <div className='mb-2 self-start text-lg font-bold'>Contact Details</div>

                {displayContactForm && 
                <form 
                    className='rounded-lg mb-3 w-full   md:flex-row md:flex-wrap p-4 bg-white shadow-md flex flex-col justify-around'
                    onSubmit={(e) => {
                        e.preventDefault();
                        setDisplayContactForm(false)
                    }}>
                    <label className='mb-2 md:w-2/5'>
                        <span className='text-sm'>Name:</span><br />
                        <input 
                            className='w-full  p-1 border border-gray-300 rounded' 
                            type="text" 
                            name="name" 
                            value={contactDetails.name} 
                            onChange={(e)=>{
                                setContactDetails({...contactDetails, [e.target.name]: e.target.value.toLowerCase()})}} 
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
                                setContactDetails({...contactDetails, [e.target.name]: e.target.value})}}
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
                                    setContactDetails({...contactDetails, [e.target.name]: e.target.value})}} required />
                        </div>
                    </label>
                    
                    
                    <button type="submit" className='flex items-center justify-center bg-blue-500 text-white p-2 rounded-lg md:w-2/5'>
                        <FontAwesomeIcon className='mr-2' icon={faFloppyDisk} /> Save
                    </button>
                </form>}

                {/* Display Passenger List */}
                    
                {!displayContactForm && <div className='w-full flex justify-between items-center bg-white p-3 mb-2 rounded-lg shadow-md md:w-fit '>

                    <table className='w-8/10 border-collapse border border-gray-400 text-center'>
                        <tr>
                            <th className='border border-gray-300 w-4/18'>Name</th>
                            <th className='border border-gray-300 w-4/18'>Email</th>
                            <th className='border border-gray-300 w-4/18'>Phone</th>
                            
                        </tr>
                        
                        <tr>
                            <td className='border border-gray-300'>{contactDetails.name}</td>
                            <td className='border border-gray-300'>{contactDetails.email}</td>
                            <td className='border border-gray-300'>{contactDetails.phoneno}</td>
                            
                        </tr>
                        
                    </table>
                    <FontAwesomeIcon
                        className='cursor-pointer text-red-500 ml-1'
                        icon={faUserEdit}
                        onClick={() => {
                            
                            setDisplayContactForm(true);
                        }}
                    />
                </div>}

            </div>

            <button onClick={()=>{
                if(passengerList.length === 0 || Object.keys(contactDetails).length === 0)  alert('must fill details')
                else {
                    dispatch(setDetails({passenger:passengerList,contact:contactDetails}));
                    navigate('/booking/payment')
                } 
            }} className='bg-orange-500 p-3 rounded-2xl text-white font-bold'> Go To Payment</button>
        </div>
    );
}
