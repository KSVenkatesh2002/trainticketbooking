import React, { useState } from 'react'
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
        if (query === '') {
            if (type === "source") setSourceSuggestions([]);
            else setDestinationSuggestions([]);
            return;
        }
    
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
    

    return (
        <div className='h-fit w-full md:py-10 relative md:static'>
            
            <img src="https://i.etsystatic.com/22260569/r/il/e1c601/3098488926/il_fullxfull.3098488926_7htx.jpg" alt="train cover photo" className='rounded-b-3xl md:rounded-t-[4rem] md:rounded-b-none object-cover h-50 md:h-100 md:w-9/10 w-full block mx-auto'/>

            <form onSubmit={(e)=>handleSumbit(e)} className="absolute top-30 left-1/2 -translate-x-1/2 w-8/10 md:static md:translate-x-0 md:w-9/10 md:rounded-t-none md:mt-4 flex flex-col justify-evenly items-center p-4  bg-white shadow-md shadow-gray-300/50 rounded-4xl mx-auto">
                
                <div className="flex flex-col md:flex-row justify-evenly items-center w-full relative">
                    {/* From */}
                    <div className="w-full md:w-1/5">
                        <label className="text-sm">From</label><br />
                        <input 
                            type="text" 
                            value={source}
                            name='source'
                            onChange={(e) => {
                                setSource(e.target.value);
                                fetchSuggestions(e.target.value, "source");}}
                            onFocus={()=>onFocus('source')} onBlur={()=>onBlur('source')}
                            className="w-full border-2 focus:border-b-4 rounded-lg h-12 text-2xl" 
                        /> 

                        { focusedSource && Object.keys(sourceSuggestions).length > 0  && 
                        <ul className='absolute w-full md:w-1/5 p-5 rounded-3xl shadow-lg shadow-black/50 bg-white'>
                            {sourceSuggestions.map((station) => (
                                <li key={station._id} 
                                    onClick={()=> {
                                        setSource(station.name);
                                        setSourceSuggestions([])}}>
                                    {station.name}
                                </li>
                            ))}
                        </ul>}
                    </div>

                    <span className='h-full flex justify-center items-center rotate-90 mt-2 md:rotate-0'><FontAwesomeIcon icon={faRightLeft} /></span>

                    {/* To */}
                    <div className="w-full md:w-1/5 ">
                        <label className="text-sm">To</label><br />
                        <input 
                            type="text" 
                            name='destination'
                            className="w-full border-2 focus:border-b-4 rounded-lg h-12 text-2xl " 
                            value={destination}
                            onFocus={()=>onFocus('destination')} 
                            onBlur={()=>onBlur('destination')}
                            onChange={(e) => {
                                setDestination(e.target.value);
                                fetchSuggestions(e.target.value, "destination");}}/>

                        {focusedDestination && Object.keys(destinationSuggestions).length > 0 &&
                        <ul className='absolute w-full md:w-1/5 p-5 rounded-3xl shadow-lg shadow-black/50 bg-white'>
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

                    {/* Date */}
                    <div className="w-full md:w-1/5">
                        <label className="text-sm">Date</label><br />
                        <input 
                            type="date"
                            name='date'
                            min={min} 
                            value={searchFormData.date}
                            onChange={(e)=>handleOnChange(e)}
                            className="w-full border-2 focus:border-b-4 rounded-lg h-12  text-2xl" 
                            />
                    </div>

                    {/* Classess */}
                    <div className="w-full md:w-1/5">
                        <label className="text-sm">Classses</label><br />
                        <select 
                            type="string" 
                            name='classes'
                            value={searchFormData.classes} 
                            onChange={(e)=>handleOnChange(e)}
                            className="w-full border-2  focus:border-b-4 rounded-lg h-12  text-2xl"
                        >
                            <option value="SL">SLEEPER</option>
                            <option value="AC2">AC 2 </option>
                            <option value="AC3">AC 3 </option>
                        </select>
                    </div>
                </div>

                {/* search button */}
                <button
                    type='sumbit'
                    className={`w-[200px] p-4 m-4 text-white font-bold rounded ${loading ? 'bg-gray-400' : 'bg-orange-500 hover:bg-orange-700'}`}
                >{loading ? 'SEARCHING...' : 'SEARCH'}</button>
                <h3 className='text-red-500 font-bold self-center text-2xl'>{error}</h3>

            </form>

            
        </div>
        
    )
}
export default Search