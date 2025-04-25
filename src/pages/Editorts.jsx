import React, { useRef, useState, useEffect } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

export default function PdfEditor() {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');
  const [mode, setMode] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [textInputPos, setTextInputPos] = useState(null);

  const pdfContainerRef = useRef(null);
  const textInputRef = useRef(null);

  // Load a blank PDF
  useEffect(() => {
    const loadPdf = async () => {
      const doc = await PDFDocument.create();
      doc.addPage();
      setPdfDoc(doc);
      const bytes = await doc.save();
      setPdfUrl(URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })));
    };
    loadPdf();
  }, []);

  const updatePDF = async () => {
    const bytes = await pdfDoc.save();
    setPdfUrl(URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })));
  };

  const handlePageClick = (e) => {
    if (!mode || !pdfDoc) return;
    const rect = pdfContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (mode === 'text') {
      setTextInputPos({ x, y });
      setTimeout(() => textInputRef.current?.focus(), 0);
    } else if (mode === 'image') {
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

  const addText = async () => {
    if (!textInput.trim() || !textInputPos || !pdfDoc) return;

    const page = pdfDoc.getPage(0);
    const { width, height } = page.getSize();
    const scaleX = width / pdfContainerRef.current.clientWidth;
    const scaleY = height / pdfContainerRef.current.clientHeight;

    page.drawText(textInput, {
      x: textInputPos.x * scaleX,
      y: height - textInputPos.y * scaleY,
      size: 12,
      color: rgb(0, 0, 0),
    });

    setTextInput('');
    setTextInputPos(null);
    setMode(null);
    await updatePDF();
  };

  const addImage = async (file, x, y) => {
    const imageBytes = await file.arrayBuffer();
    const page = pdfDoc.getPage(0);
    const { width, height } = page.getSize();
    const scaleX = width / pdfContainerRef.current.clientWidth;
    const scaleY = height / pdfContainerRef.current.clientHeight;

    try {
      let image;
      if (file.type === 'image/png') {
        image = await pdfDoc.embedPng(imageBytes);
      } else {
        image = await pdfDoc.embedJpg(imageBytes);
      }

      page.drawImage(image, {
        x: x * scaleX,
        y: height - y * scaleY - 50,
        width: 100,
        height: 100,
      });

      await updatePDF();
    } catch (err) {
      alert('Unsupported image format');
    }

    setMode(null);
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex gap-2">
        <button onClick={() => setMode('text')} className="px-4 py-2 bg-blue-600 text-white rounded">
          Add Text
        </button>
        <button onClick={() => setMode('image')} className="px-4 py-2 bg-blue-600 text-white rounded">
          Add Image
        </button>
      </div>

      <div
        ref={pdfContainerRef}
        onClick={handlePageClick}
        className="border relative w-full max-w-3xl h-[600px] mx-auto mb-4"
      >
        {textInputPos && mode === 'text' && (
          <input
            ref={textInputRef}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onBlur={addText}
            className="absolute border text-sm p-1"
            style={{
              left: textInputPos.x,
              top: textInputPos.y,
              zIndex: 10,
            }}
          />
        )}
      </div>

      <iframe src={pdfUrl} width="100%" height="600px" title="PDF Viewer" />
    </div>
  );
}
