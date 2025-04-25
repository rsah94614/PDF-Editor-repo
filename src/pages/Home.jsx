import { Link } from 'react-router-dom';
import { FaFilePdf, FaEdit, FaImage, FaSignature, FaDownload } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Edit PDFs with Ease</h1>
          <p className="text-xl mb-8">Powerful PDF editing tools at your fingertips</p>
          <Link to="/editor" className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-100 transition">
            Start Editing Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaEdit className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Text Editing</h3>
              <p className="text-gray-600">Add and edit text anywhere in your PDF</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaImage className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Image Management</h3>
              <p className="text-gray-600">Insert and remove images with ease</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaSignature className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Digital Signatures</h3>
              <p className="text-gray-600">Add your signature to documents</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaDownload className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Download</h3>
              <p className="text-gray-600">Download your edited PDF instantly</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 