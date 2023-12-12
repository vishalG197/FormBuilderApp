import React from 'react'
import img from "../images/image1.png";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
       <h1 className="text-3xl font-bold mb-8">Quiz Builder</h1>
      <div className="flex flex-col md:flex-row items-center justify-center">
      {/* Image Section */}
      <div className="md:w-1/2 mb-4 md:mb-0">
        <img className="mx-auto" src={img} alt="Centered Image" />
      </div>

      {/* Button Section */}
      <div className="md:w-1/2 ">
        <Link to="/quizecreate">
          <button className="bg-purple-500 text-white font-bold py-4 px-8 mb-2  md:mb-0 md:mr-2 w-full md:w-1/2 rounded">
            Create Quiz
          </button>
        </Link>
        <Link to="/history">
          <button className="bg-purple-500 text-white my-8 font-bold py-4 px-8 w-full md:w-1/2 rounded">
            History
          </button>
        </Link>

      </div>
    </div>
    </div>
  )
}

export default Home
