import { FaFilePdf, FaEdit, FaImage, FaSignature, FaDownload, FaPlus, FaTrash, FaEye } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <FaEdit className="text-4xl text-blue-600" />,
      title: "Text Editing",
      description: "Add and edit text anywhere in your PDF document. Our intuitive interface allows you to place text exactly where you want it, with full control over font, size, and color."
    },
    {
      icon: <FaImage className="text-4xl text-blue-600" />,
      title: "Image Management",
      description: "Easily insert and remove images from your PDF. You can resize, rotate, and position images anywhere on the page. Support for various image formats including JPG, PNG, and GIF."
    },
    {
      icon: <FaPlus className="text-4xl text-blue-600" />,
      title: "Page Management",
      description: "Add new pages, insert pages at specific positions, or remove unwanted pages from your PDF. Complete control over your document's structure."
    },
    {
      icon: <FaSignature className="text-4xl text-blue-600" />,
      title: "Digital Signatures",
      description: "Add your signature to documents securely. You can draw your signature or upload an image of your signature for a professional look."
    },
    {
      icon: <FaEye className="text-4xl text-blue-600" />,
      title: "Live Preview",
      description: "See your changes in real-time as you edit. The live preview feature ensures you get exactly what you want before saving."
    },
    {
      icon: <FaDownload className="text-4xl text-blue-600" />,
      title: "Download & Save",
      description: "Download your edited PDF instantly or save your work to continue later. All changes are preserved in high quality."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">About PDF Editor</h1>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          PDF Editor is a powerful web-based application that allows you to edit PDF documents with ease.
          Our intuitive interface and comprehensive feature set make PDF editing accessible to everyone.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="text-xl font-semibold ml-4">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">How to Use</h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-600">
            <li>Upload your PDF document or start with a blank page</li>
            <li>Use the toolbar to add text, images, or signatures</li>
            <li>Preview your changes in real-time</li>
            <li>Save your work or download the final PDF</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default About; 