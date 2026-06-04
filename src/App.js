import { createBrowserRouter, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion';
import Login from './pages/Login';
import Browse from './pages/Browse';
import Header from './features/browse/Header';
import PlayPage from './pages/PlayPage';
import ShowPage from './pages/ShowPage';
import PersonPage from './pages/PersonPage';
import SearchPage from './pages/SearchPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AppProvider } from './context/AppContext';


function App() {
    const location = useLocation();

    return (
        <AppProvider>
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
        </AppProvider>
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
            },
            {
                path: "/person/:personId",
                element: <ProtectedRoute><PersonPage /></ProtectedRoute>,
            },
            {
                path: "/search",
                element: <ProtectedRoute><SearchPage /></ProtectedRoute>,
            }
        ]
    }
]);

export default App;
