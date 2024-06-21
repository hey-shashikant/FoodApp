import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.log(err);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md text-center">
        <img 
          src="https://cdn.pixabay.com/photo/2013/07/13/12/09/sign-159285_1280.png" // Replace with a relevant error image URL
          alt="Error"
          className="w-32 h-32 mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!!!!</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-500 mb-6">
          {err.statusText || err.message}
        </p>
        <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
