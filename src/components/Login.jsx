import React from "react";
import Header from "./Header";

const Login = () => {
    const [isLogin, setIsLogin] = React.useState(true);
    const toggleLogin = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="relative">
            <Header />
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
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 mb-4 rounded bg-gray-800 text-white"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 mb-4 rounded bg-gray-800 text-white"
                />
                <button className="w-full bg-red-600 py-3 rounded text-white font-bold">
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
