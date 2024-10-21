import React from 'react';

export default function UserGuidance({ step, index }) {
    return (
        <div key={index} className="flex flex-col items-center hover:bg-gray-50 bg-opacity-0 hover:bg-opacity-10 p-2 rounded-lg bg-none transition">
            <div className="bg-[#FF5C00] rounded-full p-4 mb-4">
                <step.icon className="h-8 w-8 text-white" /> {/* Ensure 'step.icon' is a valid component */}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
            <p className="text-blue-100 text-center">{step.description}</p>
        </div>
    );
}
