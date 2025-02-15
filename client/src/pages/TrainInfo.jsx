import { useState } from "react";

const TrainInfo = () => {
    const [query, setQuery] = useState("");
    const [trains, setTrains] = useState([]);
    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        setError("");
        
        try {
            const res = await fetch(`/api/train/getTrainInfo?query=${query}`);
            const data = await res.json();

            if (!data.success) {
                setError(data.message);
                setTrains([]);
            } else {
                setTrains(data.result);
                console.log(data)
            }
        } catch (err) {
            setError("Failed to fetch train data");
        }
    };

    return (
        <div className="w-full md:w-7/10 flex flex-col items-center">
            <h1 className="text-3xl font-medium my-4">Search Train</h1>
            <form onSubmit={handleSearch} className="bg-gray-950 p-4 m-2 w-9/10 rounded-lg md:w-1/2 lg:w-1/3">
                <input
                    type="text"
                    placeholder="Enter train name, number, or time"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="p-2 border rounded w-full bg-gray-400"
                />
                <button type="submit" className="bg-indigo-500 text-white px-4 py-2 mt-2 rounded">Search</button>
            </form>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {trains.length > 0 && (
                <div className="mt-4 w-9/10">
                    {trains.map((train) => (
                        <div key={train.number} className="bg-white p-4 rounded shadow-md my-2">
                            <h2 className="text-xl font-semibold">{train.name} ({train.number})</h2>
                            <p><strong>Classes:</strong> {train.classes.join(", ")}</p>
                            <p><strong>Days of Operation:</strong> {train.daysOfOperation.join(", ")}</p>
                            
                            <div className="mt-2">
                                <h3 className="text-lg font-medium">Stations:</h3>
                                <ul className="list-disc list-inside">
                                    {train.stations.map((station, index) => (
                                        <li key={index} className="text-gray-700">
                                            <strong>{station.name}</strong> - Arrival: {station.arrival || "N/A"}, Departure: {station.departure || "N/A"}, Distance: {station.distance} km
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TrainInfo;
