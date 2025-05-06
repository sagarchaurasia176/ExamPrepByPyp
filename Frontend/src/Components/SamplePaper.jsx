import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const SamplePaper = () => {
  const samplePapers = [
    {
      id: 1,
      title: "Computer Science - Semester 4 (2023)",
      pdfUrl: "./src/DummyPaper/AutomataTheory.pdf",
      thumbnail: "./src/DummyPaper/one.png"
    },
    {
      id: 2,
      title: "Computer Science with AIML - Semester 3 (2022)",
      pdfUrl: "./src/DummyPaper/BusinessCommunication.pdf",
      thumbnail: "./src/DummyPaper/two.png"
    },
    {
      id: 3,
      title: "Electrical Engineering - Semester 5 (2023)",
      pdfUrl: "./src/DummyPaper/Dbms.pdf",
      thumbnail: "./src/DummyPaper/three.png"
    }
  ];

  return (
    <div className="bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Sample Question Papers</h2>
        <div className="w-20 h-1 bg-green-400 mx-auto mb-8"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {samplePapers.map((paper) => (
            <div 
              key={paper.id}
              className="bg-slate-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white mb-2">{paper.title}</h3>
                
                {/* PDF Preview with Blur Effect */}
                <div className="relative group overflow-hidden rounded-md">
                  <div className="absolute inset-0  bg-opacity-50 backdrop-blur-sm group-hover:backdrop-blur-none transition-all duration-300 flex items-center justify-center">
                    <img src={paper.thumbnail} alt="Thumbnail" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <Document
                    file={paper.pdfUrl}
                    loading={<div className="h-64 bg-slate-700 animate-pulse"></div>}
                    error={<div className="h-64 bg-red-900/20 flex items-center justify-center text-red-400">Failed to load PDF</div>}
                  >
                    <Page 
                      pageNumber={1} 
                      width={300}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      className="cursor-pointer"
                    />
                  </Document>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <a 
                    href={paper.pdfUrl} 
                    download
                    className="text-green-400 hover:text-green-300 flex items-center gap-1"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download PDF
                  </a>
                  <a 
                    href={paper.pdfUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md transition-colors"
                  >
                    View Fullscreen
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SamplePaper;