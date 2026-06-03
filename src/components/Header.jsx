import React from 'react'
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector, useDispatch } from 'react-redux';
import { setContentType } from '../utils/userSlice';
import { clearAll } from '../utils/movieSlice';

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const contentType = useSelector((state) => state.user.contentType);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log("User signed out successfully");
    }).catch((error) => {
      console.error("Error signing out:", error);
    });
  };

  const handleContentToggle = (type) => {
    if (type === contentType) return;
    dispatch(clearAll());
    dispatch(setContentType(type));
    navigate('/browse');
  };

  return (
    <div className="absolute top-0 left-0 w-full flex items-center justify-between p-4 z-20">
        <div className="flex items-center gap-6">
            <img onClick={() => navigate('/browse')} src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-05-14/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="netflix logo" className='w-48 drop-shadow-lg cursor-pointer' />
            {user && (
                <div className="flex gap-4">
                    <button
                        onClick={() => handleContentToggle('movie')}
                        className={`text-sm md:text-lg font-semibold transition-colors ${
                            contentType === 'movie' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                        }`}
                    >
                        Movies
                    </button>
                    <button
                        onClick={() => handleContentToggle('tv')}
                        className={`text-sm md:text-lg font-semibold transition-colors ${
                            contentType === 'tv' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                        }`}
                    >
                        TV Shows
                    </button>
                </div>
            )}
        </div>
        <div className='flex items-center gap-4'>
          {user && <p className='text-white'>Welcome, {user.displayName || user.email}!</p>}
          {user && <button className='bg-red-500 text-white rounded-md px-4 py-2' onClick={handleSignOut}>Sign Out</button>}
        </div>
        
    </div>
  )
}

export default Header
