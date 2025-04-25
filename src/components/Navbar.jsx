import { Link } from 'react-router-dom';
import { FaFilePdf } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-primary-600 text-white shadow-lg">
      <div className="container flex justify-between items-center py-4">
        <Link to="/" className="flex items-center space-x-2 hover:text-primary-100 transition-colors">
          <FaFilePdf className="text-2xl" />
          <span className="text-xl font-bold">PDF Editor</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-primary-100 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-primary-100 transition-colors">About</Link>
          <Link to="/editor" className="btn btn-secondary">
            Start Editing
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 