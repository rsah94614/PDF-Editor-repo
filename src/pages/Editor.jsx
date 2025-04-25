import { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocument, rgb } from 'pdf-lib';
import { FaFileUpload, FaPlus, FaTrash, FaImage, FaDownload, FaFont, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Editor = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [textInputPos, setTextInputPos] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [mode, setMode] = useState(null);
  const [showTextLayer, setShowTextLayer] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const fileInputRef = useRef();
  const pdfContainerRef = useRef();
  const textInputRef = useRef();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    setPdfDoc(pdfDoc);
    setPdfFile(URL.createObjectURL(file));
    resetModes();
  };

  const handlePageClick = (e) => {
    if (!mode || !pdfDoc) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (mode === 'text') {
      setTextInputPos({ x, y });
      setTimeout(() => textInputRef.current?.focus(), 0);
    } 
    else if (mode === 'image') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) await addImage(file, x, y);
      };
      input.click();
    }
  };

  const addText = async (e) => {
    e.preventDefault();
    if (!textInput.trim() || !pdfDoc || !textInputPos) return;

    const page = pdfDoc.getPage(currentPage - 1);
    const { width, height } = page.getSize();
    const scaleX = width / pdfContainerRef.current.clientWidth;
    const scaleY = height / pdfContainerRef.current.clientHeight;
    
    page.drawText(textInput, {
      x: textInputPos.x * scaleX,
      y: height - (textInputPos.y * scaleY),
      size: 12,
      color: rgb(0, 0, 0),
    });

    updatePDF();
    resetModes();
  };

  const addImage = async (file, x, y) => {
    const imageBytes = await file.arrayBuffer();
    const page = pdfDoc.getPage(currentPage - 1);
    const { width, height } = page.getSize();
    const scaleX = width / pdfContainerRef.current.clientWidth;
    const scaleY = height / pdfContainerRef.current.clientHeight;
    
    try {
      const image = await pdfDoc.embedPng(imageBytes) || await pdfDoc.embedJpg(imageBytes);
      page.drawImage(image, {
        x: x * scaleX,
        y: height - (y * scaleY) - 50,
        width: 100,
        height: 100,
      });
      updatePDF();
    } catch {
      alert('Unsupported image format');
    }
    resetModes();
  };

  const updatePDF = async () => {
    const pdfBytes = await pdfDoc.save();
    setPdfFile(URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' })));
  };

  const resetModes = () => {
    setMode(null);
    setTextInputPos(null);
    setTextInput('');
  };

  const downloadPDF = async () => {
    if (!pdfDoc) return;
    const pdfBytes = await pdfDoc.save();
    const url = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'edited-document.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <div className="flex flex-wrap gap-4 mb-4">
            <button
              onClick={() => fileInputRef.current.click()}
              disabled={!!mode}
              className={`flex items-center gap-2 px-4 py-2 rounded ${mode ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
            >
              <FaFileUpload /> Upload PDF
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".pdf" className="hidden" />

            <button
              onClick={() => setMode('text')}
              disabled={!!mode}
              className={`flex items-center gap-2 px-4 py-2 rounded ${mode === 'text' ? 'bg-green-600' : mode ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
            >
              <FaFont /> Add Text
            </button>

            <button
              onClick={() => setMode('image')}
              disabled={!!mode}
              className={`flex items-center gap-2 px-4 py-2 rounded ${mode === 'image' ? 'bg-green-600' : mode ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
            >
              <FaImage /> Add Image
            </button>

            <button
              onClick={async () => {
                if (!pdfDoc) return;
                pdfDoc.addPage();
                await updatePDF();
                setNumPages(numPages + 1);
              }}
              disabled={!!mode || !pdfDoc}
              className={`flex items-center gap-2 px-4 py-2 rounded ${mode ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
            >
              <FaPlus /> Add Page
            </button>

            <button
              onClick={async () => {
                if (!pdfDoc || numPages <= 1) return;
                pdfDoc.removePage(currentPage - 1);
                await updatePDF();
                setNumPages(numPages - 1);
                if (currentPage > numPages - 1) setCurrentPage(numPages - 1);
              }}
              disabled={!!mode || !pdfDoc || numPages <= 1}
              className={`flex items-center gap-2 px-4 py-2 rounded ${mode ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'} text-white`}
            >
              <FaTrash /> Remove Page
            </button>

            <button
              onClick={downloadPDF}
              disabled={!!mode || !pdfDoc}
              className={`flex items-center gap-2 px-4 py-2 rounded ${mode ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white`}
            >
              <FaDownload /> Download
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {currentPage} of {numPages || '--'}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(numPages || p, p + 1))}
              disabled={currentPage === numPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => setShowTextLayer(!showTextLayer)}
                className={`px-3 py-1 rounded ${showTextLayer ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                title="Toggle Text Layer"
              >
                {showTextLayer ? <FaEye /> : <FaEyeSlash />}
              </button>
              <button
                onClick={() => setShowAnnotations(!showAnnotations)}
                className={`px-3 py-1 rounded ${showAnnotations ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                title="Toggle Annotations"
              >
                {showAnnotations ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 relative">
          {pdfFile ? (
            <>
              <div
                ref={pdfContainerRef}
                onClick={handlePageClick}
                className="border relative w-full max-w-3xl h-[600px] mx-auto mb-4"
              >
                <Document
                  file={pdfFile}
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                  className="flex justify-center"
                >
                  <Page
                    pageNumber={currentPage}
                    width={800}
                    renderTextLayer={showTextLayer}
                    renderAnnotationLayer={showAnnotations}
                    className={`cursor-${mode === 'text' ? 'text' : mode === 'image' ? 'crosshair' : 'default'}`}
                  />
                </Document>

                {textInputPos && mode === 'text' && (
                  <form
                    onSubmit={addText}
                    style={{
                      position: 'absolute',
                      left: `${textInputPos.x}px`,
                      top: `${textInputPos.y}px`,
                      zIndex: 100,
                    }}
                    className="bg-white shadow-md rounded p-2 flex items-center"
                  >
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              autoFocus
              className="border border-gray-300 px-2 py-1 rounded mr-2"
              placeholder="Enter text"
            />
            <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
              Add
            </button>
            <button
              type="button"
              onClick={resetModes}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </form>
        )}
      </div>
    </>
          ) : (
          <div className="text-center py-12">
      <p className="text-gray-500">Upload a PDF file to start editing</p>
          </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Editor;