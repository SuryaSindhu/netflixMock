import { createBrowserRouter, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion';
import Login from './pages/Login';
import Browse from './pages/Browse';
import Header from './features/browse/Header';
import MoviePage from './pages/MoviePage';
import ShowsPage from './pages/ShowsPage';
import PersonPage from './pages/PersonPage';
import SearchPage from './pages/SearchPage';
import NotFound from './pages/NotFound';
import ProtectedRoute from './utils/ProtectedRoute';
import ErrorBoundary from './components/shared/ErrorBoundary';
import ScrollToTop from './components/shared/ScrollToTop';
import { AppProvider } from './context/AppContext';


function App() {
    const location = useLocation();

    return (
        <AppProvider>
            <ErrorBoundary>
            <div className="App">
                <Header />
                <ScrollToTop />
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
            </ErrorBoundary>
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
                element: <ProtectedRoute><MoviePage /></ProtectedRoute>,
            },
            {
                path: "/shows/:showId",
                element: <ProtectedRoute><ShowsPage /></ProtectedRoute>,
            },
            {
                path: "/person/:personId",
                element: <ProtectedRoute><PersonPage /></ProtectedRoute>,
            },
            {
                path: "/search",
                element: <ProtectedRoute><SearchPage /></ProtectedRoute>,
            },
            {
                path: "*",
                element: <NotFound />,
            }
        ]
    }
]);

export default App;
