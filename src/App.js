import { createBrowserRouter, Outlet, useNavigate } from 'react-router-dom'
import Login from './components/Login';
import Browse from './components/Browse';
import Header from './components/Header';
import { useEffect } from 'react';
import { auth } from './utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from './utils/userSlice';


function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
                <Outlet />
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
                element: <Browse />,
            }
        ]
    }
]);

export default App;
