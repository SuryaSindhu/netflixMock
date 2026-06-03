import { createBrowserRouter, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion';
import Login from './components/Login';
import Browse from './components/Browse';
import Header from './components/Header';
import PlayPage from './components/PlayPage';
import ShowPage from './components/ShowPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect } from 'react';
import { auth } from './utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from './utils/userSlice';


function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName } = auth.currentUser;
                console.log("signed in User ID:", uid, "displayName:", displayName);
                dispatch(setUser({ uid, email, displayName }));
                navigate("/browse");
            } else {
                // User is signed out
                console.log("User is signed out");
                dispatch(clearUser());
                navigate("/");
            }
            });
        return () => unsubscribe();
    }, []);

    return (
            <div className="App">
                <Header />
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </div>
);
}

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Login />,
            },
            {
                path: "/browse",
                element: <ProtectedRoute><Browse /></ProtectedRoute>,
            },
            {
                path: "/movies/:movieId",
                element: <ProtectedRoute><PlayPage /></ProtectedRoute>,
            },
            {
                path: "/shows/:movieId",
                element: <ProtectedRoute><ShowPage /></ProtectedRoute>,
            }
        ]
    }
]);

export default App;
