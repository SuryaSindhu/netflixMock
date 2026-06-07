import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white px-4">
            <h1 className="text-8xl font-bold text-red-600 mb-2">404</h1>
            <p className="text-2xl text-gray-200 mb-2">Lost your way?</p>
            <p className="text-gray-400 text-center max-w-md mb-8">
                Sorry, we can't find that page. You'll find lots to explore on the home page.
            </p>
            <button
                onClick={() => navigate('/browse')}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md font-medium text-lg transition-colors"
            >
                Netflix Home
            </button>
        </div>
    );
};

export default NotFound;
