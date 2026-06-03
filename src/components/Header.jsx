import React from 'react'
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log("User signed out successfully");
    }).catch((error) => {
      console.error("Error signing out:", error);
    });
  };
  return (
    <div className="absolute top-0 left-0 w-full flex items-center justify-between p-4 z-20">
        <img onClick={() => navigate('/browse')} src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-05-14/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="netflix logo" className='w-48 drop-shadow-lg cursor-pointer' />
        <div className='flex items-center gap-4'>
          <span className='text-white text-sm md:text-lg cursor-pointer hover:underline'>Kids</span>
          {user && user.displayName && <p className='text-white'>Welcome, {user.displayName}!</p>}
          {user && <button className='bg-red-500 text-white rounded-md px-4 py-2' onClick={handleSignOut}>Sign Out</button>}
        </div>
        
    </div>
  )
}

export default Header
