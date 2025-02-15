import { useState } from "react";

const PnrStatus = () => {

    const [pnrid, setPnrid] = useState('')
    const [error, setError] = useState('')
    const [details, setDetails] = useState(null)

    const getPnr = async (e)=>{
        e.preventDefault();
        const res = await fetch(`/api/train/get-my-booking?pnrid=${pnrid}`)
        const data = await res.json()
        if(data.success)    setDetails(data.result)
        else    setError(data.message)
        console.log(data)
    }
    return (
        <div className='w-full h-full flex flex-col items-center '>
            <h1 className="text-3xl font-medium mt-4"> Get Your PNR Status </h1>
            <form className="w-9/10 h-50 text-white md:w-7/10 p-4 rounded-2xl flex flex-col justify-around items-center  bg-gray-950 my-4" onSubmit={(e)=>getPnr(e)}>
                <label htmlFor="pnr_no"><strong>Enter PNR no:</strong> </label>
                <input type="text" name='pnr_no' value={pnrid} className="rounded bg-gray-500 p-2 w-9/10" onChange={(e)=>setPnrid(e.target.value)} required />
                <input className="bg-indigo-500 shadow-lg shadow-indigo-500/50 py-2 px-5 rounded-lg" type="submit" />
            </form>

            {details &&
            <div className="w-full p-4">
                <h3 ><strong>Train Details</strong></h3>
                <div className='flex flex-col items-center mt-2 mb-5 w-full bg-white rounded-lg md:w-1/2 p-2.5'>

                    {/* train header */}
                    <div className="w-full bg-orange-200 text-blue-800 ">
                        <div className='font-semibold text-2xl'>
                            <span className='mx-2'>{details.trainName}</span> | <span className='mx-2'>{details.trainNumber}</span>
                        </div>
                        <div className='text-center font-medium'>
                            <span className='mx-2'>{new Date(details.booking_date).toISOString().split('T')[0]}</span> | <span className='mx-2'>{details.class}</span>
                        </div>
                    </div>

                    {/* location and time */}
                    <div className='flex flex-row justify-between bg-orange-100 w-full px-5'>
                        <div>
                            <span className='font-medium'>{details.from.name}</span><br />
                            <span className='font-light'>({details.from.time })</span><br />
                        </div>
                        <div>
                            <span className='font-medium'>{details.to.name}</span><br />
                            <span className='font-light'>({details.to.time})</span><br />
                        </div>
                    </div>

                    

                </div>
                <h3 ><strong>Passenger Details</strong></h3>
                    <div className='flex justify-between items-center shadow-md bg-white p-3 mb-2 rounded-lg w-full md:w-7/10'>
                        <table className='w-full border-collapse border border-gray-400 text-center'>
                            <tr>
                                <th className='border border-gray-300 w-6/18 p-2 bg-orange-400'>Name</th>
                                <th className='border border-gray-300 w-2/18 p-2 bg-orange-400'>Age</th>
                                <th className='border border-gray-300 w-4/18 p-2 bg-orange-400'>Gender</th>
                                <th className='border border-gray-300 w-4/18 p-2 bg-orange-400'>Birth</th>
                            </tr>
                            
                            <tr key={details.passenger.name}>
                                <td className='border border-gray-300 px-2'>{details.passenger.name}</td>
                                <td className='border border-gray-300 px-2'>{details.passenger.age}</td>
                                <td className='border border-gray-300 px-2'>{details.passenger.gender}</td>
                                <td className='border border-gray-300 px-2'>{details.passenger.birth}</td>
                            </tr>
                            
                        </table>
                    </div>

                    <h3 ><strong>Contact Details</strong></h3>
                    <div className='w-full flex justify-between items-center bg-white p-3 mb-2 rounded-lg shadow-md md:w-7/10 '>
                        <table className='w-full border-collapse border border-gray-400 text-center'>
                            <tr>
                                <th className='border border-gray-300 w-4/18 p-2 bg-orange-400'>Name</th>
                                <td className='border border-gray-300 px-2 p-1'>{details.contact.name}</td>
                            </tr>
                            
                            <tr>
                                <th className='border border-gray-300 w-4/18 p-2 bg-orange-400'>Email</th>
                                <td className='border border-gray-300 px-2 p-1'>{details.contact.email}</td>
                            </tr>
                            <tr>
                                <th className='border border-gray-300 w-4/18 p-2 bg-orange-400'>Phone</th>
                                <td className='border border-gray-300 px-2 p-1'>{details.contact.phoneno}</td>
                            </tr> 
                        </table>
                        
                    </div>
                </div>
            }

        </div>
    )
}

export default PnrStatus