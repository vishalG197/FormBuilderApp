import logo from './logo.svg';
import './App.css';

import AllRoutes from './Routes/AllRoutes';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
     <nav className="bg-purple-500 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="text-white mr-4">
          <span className="text-2xl">&#8592;</span> Back
        </Link>
        <h1 className="text-white text-xl font-semibold">BoloForm</h1>
      </div>
      <div>
        {/* Add your profile sign or logo here */}
        <span className="text-white">Profile</span>
      </div>
    </nav>

    <AllRoutes/>
    </div>
  );
}

export default App;
