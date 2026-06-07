import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white px-4">
                    <h1 className="text-6xl font-bold text-red-600 mb-4">Oops!</h1>
                    <p className="text-xl text-gray-300 mb-6">Something went wrong.</p>
                    <button
                        onClick={() => {
                            this.setState({ hasError: false });
                            window.location.href = '/browse';
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                    >
                        Go to Home
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
