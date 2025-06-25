import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PnrStatus = () => {
    const { id } = useParams(); // Get PNR from URL if available
    const [pnrid, setPnrid] = useState(id || ""); // Initialize with URL param or empty
    const [error, setError] = useState("");
    const [details, setDetails] = useState(null);

    // Function to fetch PNR details
    const fetchPnrDetails = async (pnr) => {
        if (!pnr) return; // Prevent API call if PNR is empty
        try {
            const res = await fetch(`/api/train/get-pnr-status?pnrid=${pnr}`);
            const data = await res.json();
            if (data.success) setDetails(data.result);
            else setError(data.message);
        } catch (err) {
            setError("Failed to fetch PNR details");
        }
    };

    // Fetch details when PNR from URL is available
    useEffect(() => {
        if (id) fetchPnrDetails(id);
    }, [id]);

    // Handle form submission
    const getPnr = async (e) => {
        e.preventDefault();
        const enteredPnr = e.target.pnr_no.value.trim();
        setPnrid(enteredPnr);
        fetchPnrDetails(enteredPnr); // Fetch details for entered PNR
    };

    return (
        <div className="w-full h-auto flex flex-col items-center bg-gray-900 text-white py-6">
            <h1 className="text-3xl font-semibold mt-4 text-indigo-400">🚆 Get Your PNR Status</h1>
    
            {/* Form to enter PNR */}
            <form
                className="w-11/12 md:w-3/5 lg:w-2/5 text-white p-6 rounded-2xl flex flex-col gap-4 items-center shadow-lg mt-6"
                onSubmit={getPnr}
            >
                <label htmlFor="pnr_no" className="text-lg font-medium">Enter PNR No:</label>
                <input
                    type="text"
                    name="pnr_no"
                    className="rounded-md bg-gray-700 text-white p-3 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                />
                <input
                    className="bg-indigo-500 text-white py-2 px-6 rounded-lg shadow-lg transition-all hover:bg-indigo-600 cursor-pointer hover:shadow-indigo-500/50"
                    type="submit"
                    value="Check Status"
                />
            </form>
    
            {/* Error Message */}
            {error && <div className="text-center text-red-500 mt-4">{error}</div>}
    
            {/* Show details if available */}
            {details && (
                <div className="w-full md:w-4/5 lg:w-3/5 flex flex-col items-center p-4 text-white mt-6">
                    {/* Train Details Card */}
                    <div className="w-full bg-gray-800 text-white p-5 rounded-lg shadow-md border border-gray-700">
                        <h3 className="text-xl font-semibold text-center text-indigo-400">🚆 Train Details</h3>
                        <div className="bg-gray-700 text-indigo-300 text-center p-3 mt-3 rounded-md">
                            <p className="text-2xl font-bold">{details.trainName} | {details.trainNumber}</p>
                            <p className="font-medium text-lg">{new Date(details.booking_date).toISOString().split('T')[0]} | {details.class}</p>
                        </div>
    
                        <div className="flex justify-between bg-gray-600 p-4 mt-4 rounded-lg">
                            <div className="text-center">
                                <span className="font-medium">{details.from.name}</span>
                                <p className="text-sm text-gray-300">({details.from.time})</p>
                            </div>
                            <span className="text-xl font-bold text-gray-400">➡️</span>
                            <div className="text-center">
                                <span className="font-medium">{details.to.name}</span>
                                <p className="text-sm text-gray-300">({details.to.time})</p>
                            </div>
                        </div>
    
                        {/* New: Coach, Seat & Status */}
                        <div className="bg-gray-700 text-center text-white p-3 mt-4 rounded-md">
                            <p><strong>Coach:</strong> {details.coach}</p>
                            <p><strong>Seat:</strong> {details.seat}</p>
                            <p><strong>Status:</strong> <span className="text-green-400">{details.status}</span></p>
                        </div>
                    </div>
    
                    {/* Passenger Details */}
                    <div className="w-full bg-gray-800 text-white p-5 rounded-lg shadow-md border border-gray-700 mt-5">
                        <h3 className="text-xl font-semibold text-center text-indigo-400">🧑 Passenger Details</h3>
                        <table className="w-full text-center mt-3 border-collapse border border-gray-600">
                            <thead>
                                <tr className="bg-indigo-600 text-white">
                                    <th className="p-3 border border-gray-500">Name</th>
                                    <th className="p-3 border border-gray-500">Age</th>
                                    <th className="p-3 border border-gray-500">Gender</th>
                                    <th className="p-3 border border-gray-500">Birth</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-gray-700">
                                    <td className="p-3 border border-gray-500">{details.passenger.name}</td>
                                    <td className="p-3 border border-gray-500">{details.passenger.age}</td>
                                    <td className="p-3 border border-gray-500">{details.passenger.gender}</td>
                                    <td className="p-3 border border-gray-500">{details.passenger.birth}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
    
                    {/* Contact Details */}
                    <div className="w-full bg-gray-800 text-white p-5 rounded-lg shadow-md border border-gray-700 mt-5">
                        <h3 className="text-xl font-semibold text-center text-indigo-400">📞 Contact Details</h3>
                        <table className="w-full text-center mt-3 border-collapse border border-gray-600">
                            <tbody>
                                <tr className="bg-gray-700">
                                    <th className="p-3 border border-gray-500 bg-indigo-600 text-white">Name</th>
                                    <td className="p-3 border border-gray-500">{details.contact.name}</td>
                                </tr>
                                <tr>
                                    <th className="p-3 border border-gray-500 bg-indigo-600 text-white">Email</th>
                                    <td className="p-3 border border-gray-500">{details.contact.email}</td>
                                </tr>
                                <tr className="bg-gray-700">
                                    <th className="p-3 border border-gray-500 bg-indigo-600 text-white">Phone</th>
                                    <td className="p-3 border border-gray-500">{details.contact.phoneno}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
    
    
    
};

export default PnrStatus;
