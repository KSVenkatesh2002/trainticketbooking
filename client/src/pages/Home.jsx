import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Home() {
    const currentDate = new Date()
    const min = currentDate.toISOString().split('T')[0]

    const navigate = useNavigate()

    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [sourceSuggestions, setSourceSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [focusedSource,setFocusedSource] = useState(false)
    const [focusedDestination,setFocusedDestination] = useState(false)
    const [searchFormData, setSearchFormData] = useState({
        source,
        destination,
        date:min,
        classes:'General'
    })
    const [result, setResult] = useState(false)

    const onFocus = (type) => {
        if(type==='source')   setFocusedSource(true)
        else    setFocusedDestination(true) 
    }
    const onBlur = (type) => {
        setTimeout(() => {
            if (type === "source") setFocusedSource(false);
            else setFocusedDestination(false);
        }, 200); // Delay allows the click event to trigger first
    }

    const handleOnChange = (e) => {
        setResult(false)
        setSearchFormData({...searchFormData, [e.target.name]:e.target.value})
        console.log(searchFormData)
    }

    const handleSumbit = async () => {
        try{
            const res= await fetch(`/api/train/search?source=${searchFormData.source}&destination=${searchFormData.destination}&date=${searchFormData.date}&classes=${searchFormData.classes}`)
            const data = res.json()
            if(data.success)   navigate('/searchresult')
            else   setResult(true)
        }catch(error){
            console.log(error)
        }
    }

    // Fetch station suggestions
    const fetchSuggestions = async (query, type) => {
        if (query==='') {
            if (type === "source") setSourceSuggestions([]);
            else setDestinationSuggestions([]);
            return
        };

        const response = await fetch(`/api/train/addresslist?address=${query}`);
        const data = await response.json();

        if (type === "source") setSourceSuggestions(data);
        else setDestinationSuggestions(data);
    };

    return (
        <div className="flex flex-col items-center ">
            <div className='w-screen my-10 text-center grow'>
                <h1 className='font-bold'>Welcome to Train Ticket Booking center! 🚆</h1>
                <p className=''>Ready to embark on your next adventure? Whether you're planning a quick getaway or a long journey, we're here to make your travel experience seamless and enjoyable. Book your tickets with ease, explore diverse destinations, and get ready to create unforgettable memories. Let's get started!</p>
                <h2>Your journey begins here.</h2>
                <p>Safe travels, and happy journey! 😊✨</p>
            </div>
            <hr className='border w-screen mx-4' />

            <div className='flex flex-col md:flex-row items-center w-screen'>
                <form onSubmit={()=>handleSumbit()} className="flex flex-col w-screen max-w-[700px] md:max-w-screen p-4 grow">
                    <h1 className="b text-5xl my-4">BOOK TICKET</h1>

                    {/* row1 */}
                    <div className="flex justify-between mb-5">

                        {/* From */}
                        <div className="w-1/2">
                            <label className="text-sm">From</label><br />
                            <input 
                                type="text" 
                                value={source}
                                name='source'
                                onChange={(e) => {
                                    setSource(e.target.value);
                                    fetchSuggestions(e.target.value, "source");
                                    handleOnChange(e)
                                }}
                                onFocus={()=>onFocus('source')} onBlur={()=>onBlur('source')}
                                className="border-2  focus:border-b-4 rounded-lg h-12 text-2xl" 
                            /> 

                            { focusedSource && 
                            <ul>
                                {sourceSuggestions.map((station) => (
                                <li key={station._id} 
                                    onClick={()=> {
                                        setSource(station.name); 
                                        setSourceSuggestions([])}}
                                >
                                    {station.name}
                                </li>
                                ))}
                            </ul>}
                        </div>

                        <span></span>

                        {/* To */}
                        <div className="w-1/2">
                            <label className="text-sm">To</label><br />
                            <input type="text" className="border-2  focus:border-b-4 rounded-lg h-12 text-2xl" 
                            value={destination}
                            onChange={(e) => {
                                setDestination(e.target.value);
                                fetchSuggestions(e.target.value, "destination");
                                handleOnChange(e)}}
                            onFocus={()=>onFocus('destination')} onBlur={()=>onBlur('destination')}
                            />

                            {focusedDestination &&
                            <ul>
                                {destinationSuggestions.map((station) => (
                                <li key={station._id} 
                                    onClick={()=> { 
                                        setDestination(station.name); 
                                        setDestinationSuggestions([])}}>
                                    {station.name}
                                </li>
                                ))}
                            </ul>}
                        </div>
                        {/* Show suggestions for destination */}
                    </div>

                    {/* row2 */}
                    <div className="flex justify-between mb-10">

                        {/* Date */}
                        <div className="w-1/2">
                            <label className="text-sm">Date</label><br />
                            <input 
                                type="date"
                                name='date'
                                min={min} 
                                value={searchFormData.date}
                                onChange={(e)=>handleOnChange(e)}
                                className="border-2  focus:border-b-4 rounded-lg h-12 text-2xl" />
                        </div>

                        {/* Classess */}
                        <div className="w-1/2">
                            <label className="text-sm">Classses</label><br />
                            <select 
                                type="string" 
                                name='classes'
                                value={searchFormData.classes} 
                                onChange={(e)=>handleOnChange(e)}
                                className="border-2  focus:border-b-4 rounded-lg h-12 text-2xl"
                            >
                                <option value="sleeper">SLEEPER</option>
                                <option value="ac">AC</option>
                                <option value="General">GENERAL</option>
                            </select>
                        </div>
                    </div>

                    {/* row3 */}
                    <button
                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                    >SEARCH</button>
                    <h3>{result && 'no trains available'}</h3>

                </form>

                <hr className='border w-screen md:hidden mb-5 mt-5' />
                {/* other links */}
                <div className=' box-border m-10 md:border-2 p-4 w-70 md:h-80 rounded-lg '>
                    <ul>
                        <li className='text-blue-700 font-semibold hover:underline'><Link className=''>Check PNR status</Link></li>
                        <li className='text-blue-700 font-semibold hover:underline'><Link className=''>Train info</Link></li>
                        <li className='text-blue-700 font-semibold hover:underline'><Link className=''>Booking list</Link></li>
                        <li className='text-blue-700 font-semibold hover:underline'><Link className=''>Add Passenger info</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Home