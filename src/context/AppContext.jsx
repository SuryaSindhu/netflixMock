import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [contentType, setContentType] = useState('movie');
    const [searchCache, setSearchCache] = useState({
        query: '',
        movieResults: [],
        tvResults: [],
        personResults: [],
        selectedGenres: [],
        genreResults: [],
        genreSearched: false,
    });
    const navigate = useNavigate();

    const clearUser = () => {
        setUser(null);
        setSearchCache({ query: '', movieResults: [], tvResults: [], personResults: [], selectedGenres: [], genreResults: [], genreSearched: false });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                const { uid, email, displayName } = firebaseUser;
                setUser({ uid, email, displayName });
                if (window.location.pathname === '/') navigate("/browse", { replace: true });
            } else {
                clearUser();
                navigate("/", { replace: true });
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <AppContext.Provider value={{ user, setUser, clearUser, contentType, setContentType, searchCache, setSearchCache }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
