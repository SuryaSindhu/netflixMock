import React from "react";
import { validateData } from "../utils/validations";
import {auth} from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice";

const Login = () => {
    const [isLogin, setIsLogin] = React.useState(true);
    const email = React.useRef();
    const password = React.useRef();
    const userName = React.useRef();
    const [error, setError] = React.useState(null);
    const dispatch = useDispatch();

    const toggleLogin = () => {
        setIsLogin(!isLogin);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const error = validateData(email.current.value, password.current.value);
        setError(error);

        if(error) return;

        if(isLogin) {
            // Handle login logic
            console.log("Logging in with", email.current.value, password.current.value);

            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log("User logged in:", user);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    setError(errorMessage);
                });

        } else {
            
            // Handle signup logic
            console.log("Signing up with", email.current.value, password.current.value);

            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log("User created:", user);

                    updateProfile(user, {
                        displayName: userName.current.value
                            }).then(() => {
                            const { uid, email, displayName } = auth.currentUser;
                            dispatch(setUser({ uid, email, displayName }));
                            }).catch((error) => {
                            setError(error.message);
                        });
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    setError(errorMessage);
                });

        }
    };


    return (
        <div className="relative">
            <img
                src="https://assets.nflxext.com/ffe/siteui/vlv3/435e8bb8-7f1b-49cb-8da8-bff997124294/web/IN-en-20260511-TRIFECTA-perspective_ec39852e-0b48-4e8a-b415-dd8376cd83ce_large.jpg"
                alt="netflix login background"
                className="w-full h-screen object-cover"
            />

            <form className="w-80 md:w-96 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 p-8 rounded-lg">
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
                {error && <p className="text-red-500">{error}</p>}
                <button className="w-full bg-red-600 py-3 rounded text-white font-bold" onClick={handleSubmit}>
                    {isLogin ? "Sign In" : "Sign Up"}
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
