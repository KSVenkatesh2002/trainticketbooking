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
        <div className="w-full h-full flex flex-col items-center">
            <h1 className="text-3xl font-medium mt-4">Get Your PNR Status</h1>

            {/* Form to enter PNR */}
            <form
                className="w-9/10 h-50 text-white md:w-7/10 p-4 rounded-2xl flex flex-col justify-around items-center bg-gray-950 my-4"
                onSubmit={getPnr}
            >
                <label htmlFor="pnr_no"><strong>Enter PNR no:</strong></label>
                <input
                    type="text"
                    name="pnr_no"
                    className="rounded bg-gray-500 p-2 w-9/10"
                    required
                />
                <input
                    className="bg-indigo-500 shadow-lg shadow-indigo-500/50 py-2 px-5 rounded-lg"
                    type="submit"
                    value="Check Status"
                />
            </form>

            {/* Error Message */}
            {error && <div className="text-center text-red-500 mt-10">{error}</div>}

            {/* Show details if available */}
            {details && (
                <div className="w-full md:w-7/10 flex-col flex items-center p-4">
                    <h3 className=""><strong>Train Details</strong></h3>
                    <div className="flex flex-col items-center mt-2 mb-5 w-full bg-white rounded-lg p-2.5">
                        {/* Train Header */}
                        <div className="w-full bg-orange-200 text-blue-800">
                            <div className="font-semibold text-2xl">
                                <span className="mx-2">{details.trainName}</span> |
                                <span className="mx-2">{details.trainNumber}</span>
                            </div>
                            <div className="text-center font-medium">
                                <span className="mx-2">{new Date(details.booking_date).toISOString().split('T')[0]}</span> |
                                <span className="mx-2">{details.class}</span>
                            </div>
                        </div>

                        {/* Location & Time */}
                        <div className="flex flex-row justify-between bg-orange-100 w-full px-5">
                            <div>
                                <span className="font-medium">{details.from.name}</span><br />
                                <span className="font-light">({details.from.time})</span><br />
                            </div>
                            <div>
                                <span className="font-medium">{details.to.name}</span><br />
                                <span className="font-light">({details.to.time})</span><br />
                            </div>
                        </div>
                    </div>

                    {/* Passenger Details */}
                    <h3><strong>Passenger Details</strong></h3>
                    <div className="flex justify-between items-center shadow-md bg-white p-3 mb-2 rounded-lg w-full">
                        <table className="w-full border-collapse border border-gray-400 text-center">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 w-6/18 p-2 bg-orange-400">Name</th>
                                    <th className="border border-gray-300 w-2/18 p-2 bg-orange-400">Age</th>
                                    <th className="border border-gray-300 w-4/18 p-2 bg-orange-400">Gender</th>
                                    <th className="border border-gray-300 w-4/18 p-2 bg-orange-400">Birth</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 px-2">{details.passenger.name}</td>
                                    <td className="border border-gray-300 px-2">{details.passenger.age}</td>
                                    <td className="border border-gray-300 px-2">{details.passenger.gender}</td>
                                    <td className="border border-gray-300 px-2">{details.passenger.birth}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Contact Details */}
                    <h3><strong>Contact Details</strong></h3>
                    <div className="w-full flex justify-between items-center bg-white p-3 mb-2 rounded-lg shadow-md">
                        <table className="w-full border-collapse border border-gray-400 text-center">
                            <tbody>
                                <tr>
                                    <th className="border border-gray-300 w-4/18 p-2 bg-orange-400">Name</th>
                                    <td className="border border-gray-300 px-2 p-1">{details.contact.name}</td>
                                </tr>
                                <tr>
                                    <th className="border border-gray-300 w-4/18 p-2 bg-orange-400">Email</th>
                                    <td className="border border-gray-300 px-2 p-1">{details.contact.email}</td>
                                </tr>
                                <tr>
                                    <th className="border border-gray-300 w-4/18 p-2 bg-orange-400">Phone</th>
                                    <td className="border border-gray-300 px-2 p-1">{details.contact.phoneno}</td>
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
