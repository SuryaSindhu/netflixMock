import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { NETFLIX_LOGO } from "../../utils/constants";
import { useAppContext } from "../../context/AppContext";

const Header = () => {
    const { user, clearUser, contentType, setContentType } = useAppContext();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const isExplore = pathname === "/search";
    const isMoviePage = pathname.startsWith("/movies/");
    const isShowPage = pathname.startsWith("/shows/");

    const isMoviesActive =
        isMoviePage || (!isExplore && !isShowPage && contentType === "movie");
    const isTVActive =
        isShowPage || (!isExplore && !isMoviePage && contentType === "tv");

    const handleSignOut = () => {
        if (user?.isGuest) {
            clearUser();
            navigate("/", { replace: true });
            return;
        }
        signOut(auth)
            .then(() => {
                console.log("User signed out successfully");
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            });
    };

    const handleContentToggle = (type) => {
        if (type === contentType && pathname === "/browse") return;
        setContentType(type);
        navigate("/browse");
    };

    return (
        <div className="absolute top-0 left-0 w-full flex items-center justify-between px-3 py-3 md:p-4 z-20">
            {/* Mobile: centered logo - phones only */}
            <img
                onClick={() => navigate("/browse")}
                src={NETFLIX_LOGO}
                alt="netflix logo"
                className="md:hidden absolute left-1/2 -translate-x-1/2 w-24 drop-shadow-lg cursor-pointer"
            />

            <div className="flex items-center gap-3 md:gap-6">
                {/* Mobile hamburger - phones only */}
                {user && (
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-white text-2xl"
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>
                )}

                {/* Desktop logo */}
                <img
                    onClick={() => navigate("/browse")}
                    src={NETFLIX_LOGO}
                    alt="netflix logo"
                    className="w-48 drop-shadow-lg cursor-pointer hidden md:block"
                />

                {user && (
                    <>
                        {/* Desktop nav */}
                        <div className="hidden md:flex gap-4">
                            <button
                                onClick={() => handleContentToggle("movie")}
                                className={`text-lg font-semibold transition-colors ${
                                    isMoviesActive
                                        ? "text-white"
                                        : "text-gray-400 hover:text-gray-200"
                                }`}
                            >
                                Movies
                            </button>
                            <button
                                onClick={() => handleContentToggle("tv")}
                                className={`text-lg font-semibold transition-colors ${
                                    isTVActive
                                        ? "text-white"
                                        : "text-gray-400 hover:text-gray-200"
                                }`}
                            >
                                TV Shows
                            </button>
                            <button
                                onClick={() => navigate("/search")}
                                className={`text-lg font-semibold transition-colors ${
                                    isExplore
                                        ? "text-white"
                                        : "text-gray-400 hover:text-gray-200"
                                }`}
                            >
                                Explore
                            </button>
                        </div>
                    </>
                )}
            </div>
            <div className="flex items-center gap-2 md:gap-4">
                {user && (
                    <p className="text-white text-xs md:text-base hidden md:block">
                        Welcome, {user.displayName || user.email}!
                    </p>
                )}
                {user && !user.isGuest && (
                    <button
                        className="bg-[#e50914] hover:bg-[#c11119] text-white rounded-md px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base transition-colors"
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </button>
                )}
            </div>

            {/* Mobile dropdown menu */}
            {menuOpen && user && (
                <div className="absolute top-full left-0 w-full bg-black/95 border-t border-zinc-800 md:hidden flex flex-col items-center gap-3 py-4">
                    <button
                        onClick={() => {
                            handleContentToggle("movie");
                            setMenuOpen(false);
                        }}
                        className={`text-base font-semibold transition-colors ${
                            isMoviesActive ? "text-white" : "text-gray-400"
                        }`}
                    >
                        Movies
                    </button>
                    <button
                        onClick={() => {
                            handleContentToggle("tv");
                            setMenuOpen(false);
                        }}
                        className={`text-base font-semibold transition-colors ${
                            isTVActive ? "text-white" : "text-gray-400"
                        }`}
                    >
                        TV Shows
                    </button>
                    <button
                        onClick={() => {
                            navigate("/search");
                            setMenuOpen(false);
                        }}
                        className={`text-base font-semibold transition-colors ${
                            isExplore ? "text-white" : "text-gray-400"
                        }`}
                    >
                        Explore
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
