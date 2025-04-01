import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setTrainsList} from '../../redux/slices/trainSlice';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';

function Search() {
    const currentDate = new Date()
    const min = currentDate.toISOString().split('T')[0]

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [sourceSuggestions, setSourceSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [focusedSource,setFocusedSource] = useState(false)
    const [focusedDestination,setFocusedDestination] = useState(false)
    const [searchFormData, setSearchFormData] = useState({
        source:'',
        destination:'',
        date:min,
        classes:'SL'
    })
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
 
    // useEffect(()=>{
    //     console.log('\n\n\n',searchFormData)
    //     console.log('sourceSuggestions :',sourceSuggestions)
    //     console.log('destinationSuggestions :',destinationSuggestions)
    // },[searchFormData, sourceSuggestions, destinationSuggestions])

    const onFocus = (type) => {
        setError('')
        if(type==='source')   setFocusedSource(true)
        else    setFocusedDestination(true) 
    }
    const onBlur = (type) => {
        setTimeout(() => {
            if (type === "source") setFocusedSource(false);
            else setFocusedDestination(false);
        }, 500); // Delay allows the click event to trigger first
    }

    const handleOnChange = (e) => {
        
        setSearchFormData({...searchFormData, [e.target.name]:e.target.value})
    }

    const handleSumbit = async (e) => {
        setError('')
        
        e.preventDefault();
        try{
            setLoading(true)
            const res = await fetch(`/api/train/search?sourceStation=${source}&destinationStation=${destination}&date=${searchFormData.date}&trainClass=${searchFormData.classes}`,{method:'GET'})
            const data = await res.json()
            console.log('res',data)
            if(data.success)   {
                dispatch(setTrainsList({
                    trains:data.trains,
                    source,
                    destination,
                    date: searchFormData.date
                }))
                navigate("/train-list", {
                    state: { data }})}
            else   setError(data.message)
            setLoading(false)
        
        }catch(e){
            console.log(e)
            setError(e.message)
            setLoading(false)
        }
        
    }

    // Fetch station suggestions
    const fetchSuggestions = async (query, type) => {
        // if (query === '') {
        //     if (type === "source") setSourceSuggestions([]);
        //     else setDestinationSuggestions([]);
        //     return;
        // }
    
        try {
            const response = await fetch(`/api/train/address-list?address=${query}`);
            const data = await response.json();
    
            // Ensure data is an array before setting state
            if (Array.isArray(data)) {
                if (type === "source") setSourceSuggestions(data);
                else setDestinationSuggestions(data);
            } else {
                if (type === "source") setSourceSuggestions([]); 
                else setDestinationSuggestions([]);
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            if (type === "source") setSourceSuggestions([]);
            else setDestinationSuggestions([]);
        }
    };
    // Fetch station suggestions at initial render
    useEffect(() => {
        fetchSuggestions('', "source");
        fetchSuggestions('', "destination");
    },[])
    

    return (
        <div className="min-h-screen bg-gray-900 w-full py-10 flex flex-col items-center  overflow-y-scroll hide-scrollbar">
            
            {/* Train Cover Image */}
            <div className="relative w-11/12 md:w-9/10 md:rounded-[4rem] rounded-2xl h-56 md:h-96 mx-auto shadow-2xl overflow-hidden">
                {/* Background Image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500 filter brightness-85"
                    style={{
                        backgroundImage: `url('https://i.etsystatic.com/22260569/r/il/e1c601/3098488926/il_fullxfull.3098488926_7htx.jpg')`,
                    }}
                ></div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>

                {/* Text Content */}
                <div className="relative flex flex-col justify-center items-center h-full text-center px-6">
                    <h1 className="text-white text-3xl md:text-5xl font-extrabold tracking-wider drop-shadow-lg">
                        Welcome to <span className="text-yellow-400">Train Ticket Booking</span> Center! 🚆
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl mt-2 tracking-wide">
                        Book your journey with ease and comfort.
                    </p>
                </div>
            </div>

    
            {/* Search Form */}
            <form 
                onSubmit={(e) => handleSumbit(e)}
                className="w-11/12 md:w-4/5 lg:w-3/5  bg-gray-800 text-white p-6 mt-6 rounded-2xl shadow-lg flex flex-col items-center gap-6"
            >
                <h2 className="text-2xl font-semibold text-indigo-400">🚆 Search for a Train</h2>
    
                {/* Inputs Container */}
                <div className="w-full flex flex-col md:flex-row justify-between gap-6 h-full">
                    
                    {/* From */}
                    <div className="w-full md:w-1/5 relative z-11">
                        <label className="text-sm text-gray-400">From</label>
                        <input 
                            type="text" 
                            value={source}
                            name='source'
                            onChange={(e) => {
                                setSource(e.target.value);
                                fetchSuggestions(e.target.value, "source");
                            }}
                            onFocus={() => onFocus('source')} 
                            onBlur={() => onBlur('source')}
                            className="w-full border-b-2 border-gray-500 bg-gray-800 text-white h-12 text-xl outline-none focus:border-indigo-400 hover:border-indigo-400 focus:border-b-4"
                        />
                        {focusedSource && Object.keys(sourceSuggestions).length > 0 && 
                            <ul className="absolute w-full max-h-fit overflow-auto h-60 bg-gray-700 text-white rounded-md shadow-md mt-2">
                                {sourceSuggestions.map((station) => (
                                    <li 
                                        key={station._id} 
                                        className="p-2 hover:bg-gray-600 cursor-pointer"
                                        onClick={() => {
                                            setSource(station.name);
                                            setSourceSuggestions([]);
                                        }}
                                    >
                                        {station.name}
                                    </li>
                                ))}
                            </ul>
                        }
                    </div>
    
                    {/* Swap Icon */}
                    <span className="flex justify-center items-center rotate-90 md:rotate-0 text-gray-500 text-2xl">
                        <FontAwesomeIcon icon={faRightLeft} />
                    </span>
    
                    {/* To */}
                    <div className="w-full md:w-1/5 relative z-10">
                        <label className="text-sm text-gray-400">To</label>
                        <input 
                            type="text" 
                            name='destination'
                            className="w-full border-b-2 border-gray-500 bg-gray-800 text-white h-12 text-xl outline-none focus:border-indigo-400 hover:border-indigo-400 focus:border-b-4"
                            value={destination}
                            onFocus={() => onFocus('destination')} 
                            onBlur={() => onBlur('destination')}
                            onChange={(e) => {
                                setDestination(e.target.value);
                                fetchSuggestions(e.target.value, "destination");
                            }}
                        />
                        {focusedDestination && Object.keys(destinationSuggestions).length > 0 &&
                            <ul className="absolute w-full bg-gray-700 text-white rounded-md shadow-md mt-2 max-h-fit overflow-auto h-60">
                                {destinationSuggestions.map((station) => (
                                    <li 
                                        key={station._id} 
                                        className="p-2 hover:bg-gray-600 cursor-pointer"
                                        onClick={() => { 
                                            setDestination(station.name);
                                            setDestinationSuggestions([]);
                                        }}
                                    >
                                        {station.name}
                                    </li>
                                ))}
                            </ul>
                        }
                    </div>
    
                    {/* Date */}
                    <div className="w-full md:w-1/5">
                        <label className="text-sm text-gray-400">Date</label>
                        <input 
                            type="date"
                            name='date'
                            min={min} 
                            value={searchFormData.date}
                            onChange={(e) => handleOnChange(e)}
                            className="w-full h-12 text-xl bg-gray-800 text-white border-b-2 border-gray-500 outline-none focus:border-indigo-400 scroll-auto"
                        />
                    </div>
    
                    {/* Classes */}
                    <div className="w-full md:w-1/5">
                        <label className="text-sm text-gray-400">Class</label>
                        <select 
                            name='classes'
                            value={searchFormData.classes} 
                            onChange={(e) => handleOnChange(e)}
                            className="w-full h-12 text-xl bg-gray-800 text-white border-b-2 border-gray-500 outline-none focus:border-indigo-400"
                        >
                            <option className='bg-gray-900' value="SL">Sleeper</option>
                            <option className='bg-gray-900' value="AC2">AC 2</option>
                            <option className='bg-gray-900' value="AC3">AC 3</option>
                        </select>
                    </div>
                </div>
    
                {/* Search Button */}
                <button
                    type='submit'
                    className={`w-48 py-3 font-bold rounded-lg transition-all ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-700'}`}
                    disabled={loading}
                >
                    {loading ? 'SEARCHING...' : 'SEARCH'}
                </button>
    
                {/* Error Message */}
                {error && <h3 className="text-red-500 font-semibold text-xl">{error}</h3>}
            </form>
        </div>
    );
    
}
export default Search