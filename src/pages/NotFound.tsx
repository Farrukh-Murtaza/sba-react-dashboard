import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="text-center py-20">
            <h1 className="text-5xl font-bold mb-4">
                404
            </h1>

            <p className="text-gray-500 mb-6">
                Page not found
            </p>

            <Link
                to="/"
                className="bg-blue-600 text-white px-5 py-3 rounded-lg"
            >
                Go to Dashboard
            </Link>
        </div>
    );
}

export default NotFound;