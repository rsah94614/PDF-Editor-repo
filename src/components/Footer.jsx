const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-primary-400">PDF Editor</h3>
            <p className="text-gray-400 mt-1">Edit your PDFs with ease</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-400">© {new Date().getFullYear()} PDF Editor. All rights reserved.</p>
            <p className="text-gray-400 mt-1">Made with ❤️ for PDF enthusiasts</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 