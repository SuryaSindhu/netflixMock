import React from "react";
import { useNavigate } from "react-router-dom";
import { validateData } from "../utils/validations";
import {auth} from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice";
import { NETFLIX_BG } from "../utils/constants";

const getFirebaseError = (errorCode) => {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return 'This email is already registered. Try signing in.';
        case 'auth/invalid-email':
            return 'Please enter a valid email address.';
        case 'auth/user-not-found':
            return 'No account found with this email.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please try again.';
        case 'auth/invalid-credential':
            return 'Invalid email or password.';
        case 'auth/too-many-requests':
            return 'Too many attempts. Please try again later.';
        case 'auth/weak-password':
            return 'Password is too weak. Use at least 6 characters.';
        case 'auth/network-request-failed':
            return 'Network error. Check your connection.';
        default:
            return 'Something went wrong. Please try again.';
    }
};

const Login = () => {
    const [isLogin, setIsLogin] = React.useState(true);
    const email = React.useRef();
    const password = React.useRef();
    const userName = React.useRef();
    const [error, setError] = React.useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleLogin = () => {
        setIsLogin(!isLogin);
    };

    const handleGuestLogin = (e) => {
        e.preventDefault();
        dispatch(setUser({ uid: 'guest', email: 'guest@netflix.com', displayName: 'Guest', isGuest: true }));
        navigate('/browse', { replace: true });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const error = validateData(email.current.value, password.current.value);
        setError(error);

        if(error) return;

        if(isLogin) {
            // Handle login logic

            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                })
                .catch((error) => {
                    setError(getFirebaseError(error.code));
                });

        } else {
            
            // Handle signup logic

            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;

                    updateProfile(user, {
                        displayName: userName.current.value
                            }).then(() => {
                            const { uid, email, displayName } = auth.currentUser;
                            dispatch(setUser({ uid, email, displayName }));
                            }).catch((error) => {
                            setError(getFirebaseError(error.code));
                        });
                })
                .catch((error) => {
                    setError(getFirebaseError(error.code));
                });

        }
    };


    return (
        <div className="relative">
            <img
                src={NETFLIX_BG}
                alt="netflix login background"
                className="w-full h-screen object-cover"
            />

            <form className="w-[90%] max-w-sm md:max-w-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 p-6 md:p-8 rounded-lg">
                <h2 className="text-3xl mb-6 text-white">
                    {isLogin ? "Sign In" : "Sign Up"}
                </h2>
                {!isLogin && (
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-3 mb-4 rounded bg-gray-800 text-white"
                        ref={userName}
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 mb-4 rounded bg-gray-800 text-white"
                    ref={email}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 mb-4 rounded bg-gray-800 text-white"
                    ref={password}
                />
                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 rounded px-4 py-3 mb-4 flex items-start gap-2">
                        <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                        </svg>
                        <p className="text-red-500 text-sm">{error}</p>
                    </div>
                )}
                <button className="w-full bg-red-600 py-3 rounded text-white font-bold" onClick={handleSubmit}>
                    {isLogin ? "Sign In" : "Sign Up"}
                </button>

                <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-gray-600"></div>
                    <span className="text-gray-400 text-sm">or</span>
                    <div className="flex-1 h-px bg-gray-600"></div>
                </div>

                <button
                    className="w-full bg-zinc-700 hover:bg-zinc-600 py-3 rounded text-white font-medium transition-colors"
                    onClick={handleGuestLogin}
                >
                    Continue as Guest
                </button>
                <p className="text-white mt-4">
                    {isLogin ? "New to Netflix?" : "Already have an account?"}{" "}
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={toggleLogin}
                    >
                        {isLogin ? "Sign up now" : "Sign in"}
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
