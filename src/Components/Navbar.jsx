import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 flex justify-between text-white">
      <h1 className="font-bold text-xl">PlaceMentor AI</h1>
      <div className="space-x-4">
        <Link to="/">Dashboard</Link>
        <Link to="/upload">Resume Upload</Link>
      </div>
    </nav>
  );
};

export default Navbar;