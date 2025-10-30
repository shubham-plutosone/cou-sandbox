import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs  } from 'react-pdf';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import '../../node_modules/react-pdf/dist/Page/AnnotationLayer.css';
import '../../node_modules/react-pdf/dist/Page/TextLayer.css';
import workerSrc from '../../node_modules/pdfjs-dist/build/pdf.worker.min.mjs?url';

// Fix worker
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

// const DocumentViewer = ({ file }) => {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [scale, setScale] = useState(1.2); // zoom

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   const goToPrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
//   const goToNextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages));
//   const zoomIn = () => setScale(prev => prev + 0.2);
//   const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       {/* Toolbar */}
//       <div style={{ marginBottom: '10px' }}>
//         <button onClick={goToPrevPage}>Prev</button>
//         <span>{pageNumber} / {numPages}</span>
//         <button onClick={goToNextPage}>Next</button>
//         <button onClick={zoomOut}>-</button>
//         <button onClick={zoomIn}>+</button>
//       </div>

//       {/* PDF Document */}
//       <Document file={{ url: file }} onLoadSuccess={onDocumentLoadSuccess}>
//         <Page pageNumber={pageNumber} scale={scale} />
//       </Document>
//     </div>
//   );
// };

// export default DocumentViewer;


// const MultiPagePDFViewer = ({ file }) => {
//     console.log("Data=>>>",file);
//   const [numPages, setNumPages] = useState<number | null>(null);
//   const [scale, setScale] = useState(1.2);

//   const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
//     setNumPages(numPages);
//   };

//   return (
//     <div style={{ display: 'flex', height: '80vh', border: '1px solid #ddd' }}>
//       {/* Sidebar */}
//       <div style={{ width: '250px', borderRight: '1px solid #ddd', padding: '10px', overflowY: 'auto' }}>
//         <h3>Contents</h3>
//         {Array.from({ length: numPages ?? 0 }, (_, i) => (
//           <div key={i} style={{ margin: '5px 0', cursor: 'pointer' }}>
//             Page {i + 1}
//           </div>
//         ))}
//       </div>

//       {/* PDF Scrollable area */}
//       <div style={{ flex: 1, overflowY: 'scroll', padding: '10px' }}>
//         <Document file={{ url: file }} onLoadSuccess={onDocumentLoadSuccess}>
//           {Array.from({ length: numPages ?? 0 }, (_, index) => (
//             <Page
//               key={`page_${index + 1}`}
//               pageNumber={index + 1}
//               scale={scale}
//               renderAnnotationLayer
//               renderTextLayer
//               width={800}
//             //   style={{ marginBottom: '10px' }}
//             />
//           ))}
//         </Document>
//       </div>
//     </div>
//   );
// };

// export default MultiPagePDFViewer;

import { extractPDFText } from './ExtractPdfText';

const PDFTextViewer = ({ file }) => {
  const [blocks, setBlocks] = useState<{ type: string; text: string }[]>([]);

  useEffect(() => {
    extractPDFText(file).then(setBlocks);
  }, [file]);

  const titles = blocks.filter(b => b.type === 'title');

  return (
    <div style={{ display: 'flex', height: '80vh', border: '1px solid #ddd' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', borderRight: '1px solid #ddd', padding: '10px', overflowY: 'auto' }}>
        <h3>Contents</h3>
        {titles.map((t, idx) => (
          <div key={idx} style={{ margin: '5px 0', cursor: 'pointer' }}>
            {t.text}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflowY: 'scroll', padding: '10px' }}>
        {blocks.map((b, idx) =>
          b.type === 'title' ? <h2 key={idx}>{b.text}</h2> : <p key={idx}>{b.text}</p>
        )}
      </div>
    </div>
  );
};

export default PDFTextViewer;

