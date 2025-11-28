import { useState, useRef, useEffect } from "react";

export default function MultiSelect({ selectedValues, error, options, onChange }) {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);

    const ref = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const filteredOptions = options.filter((o) =>
        o.toLowerCase().includes(query.toLowerCase())
    );

    // Toggle item (ADD or REMOVE)
    const toggleValue = (item) => {
        if (selectedValues.includes(item)) {
            onChange(selectedValues.filter((v) => v !== item));
        } else {
            onChange([...selectedValues, item]);
        }
    };

    return (
        <div className="w-full relative" ref={ref}>   {/* <-- fix absolute overlap */}
            
            {/* Selected box */}
            <div
                onClick={() => setOpen((prev) => !prev)}
                className={`border ${error ? "border-red-300" : "border-gray-300"} bg-white/60 rounded-lg px-2 py-1.5 text-sm flex flex-wrap gap-2 cursor-pointer`}
            >
                {selectedValues.length > 0 ? (
                    selectedValues.map((item) => (
                        <div
                            key={item}
                            className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded flex items-center gap-1"
                        >
                            {item}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleValue(item); // FIXED
                                }}
                            >
                                ×
                            </button>
                        </div>
                    ))
                ) : (
                    <span className="text-gray-400">Select tech…</span>
                )}
            </div>

            {/* Dropdown */}
            {open && (
                <div className="mt-1 bg-white border border-gray-200 rounded-lg shadow p-2 text-sm max-h-40 overflow-y-auto absolute w-full z-20">
                    
                    {/* Search Input */}
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full p-1 text-sm border rounded mb-2"
                        placeholder="Search…"
                    />

                    {/* Options */}
                    {filteredOptions.map((item) => (
                        <div
                            key={item}
                            onClick={() => toggleValue(item)} // FIXED
                            className={`px-2 py-1 rounded cursor-pointer ${
                                selectedValues.includes(item)
                                    ? "bg-blue-100 text-blue-700"
                                    : "hover:bg-gray-100"
                            }`}
                        >
                            {item}
                        </div>
                    ))}

                    {filteredOptions.length === 0 && (
                        <p className="text-gray-400 text-center py-2 text-sm">No results</p>
                    )}
                </div>
            )}
        </div>
    );
}
