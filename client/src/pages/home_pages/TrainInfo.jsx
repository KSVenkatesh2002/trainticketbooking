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
        <div className="w-screen min-h-screen flex flex-col items-center bg-gray-900 text-white">
            <h1 className="text-3xl font-medium my-4">Search Train</h1>
            <form onSubmit={handleSearch} className="bg-gray-950 p-4 w-9/10 rounded-lg md:w-1/2 lg:w-1/3">
                <input
                    type="text"
                    placeholder="Enter train name or number"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="p-2 border rounded w-full bg-gray-400 text-black"
                />
                <button type="submit" className="bg-indigo-500 text-white px-4 py-2 mt-2 rounded">Search</button>
            </form>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {trains.length > 0 && (
                <div className="mt-4 w-9/10">
                    {trains.map((train) => (
                        <div key={train.number} className="bg-gray-800 text-gray-100 p-4 rounded-2xl my-2">
                            <h2 className="text-xl font-semibold">{train.name} ({train.number})</h2>
                            <p><strong>Classes:</strong> {train.classes.join(", ")}</p>
                            <p><strong>Days of Operation:</strong> {train.daysOfOperation.join(", ")}</p>
                            
                            <div className="mt-4 p-4 bg-gray-800 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-white mb-3">🚉 Train Stations</h3>
                            <div className="space-y-4">
                                {train.stations.map((station, index) => (
                                    <div key={index} className="p-3 bg-gray-900 rounded-lg shadow-md">
                                        <h4 className="text-lg font-semibold text-yellow-400">{station.name}</h4>
                                        <div className="grid grid-cols-2 gap-4 text-gray-300 mt-2">
                                            <p>🕒 <strong>Arrival:</strong> {station.arrival || "N/A"}</p>
                                            <p>🚦 <strong>Departure:</strong> {station.departure || "N/A"}</p>
                                            <p>📏 <strong>Distance:</strong> {station.distance} km</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
</div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TrainInfo;
