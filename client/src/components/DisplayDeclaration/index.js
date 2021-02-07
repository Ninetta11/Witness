// import { useState } from 'react';
// import { Document, Page } from 'react-pdf';

// function displayDeclaration(document) {
//     const [numPages, setNumPages] = useState(null);
//     const [pageNumber, setPageNumber] = useState(1);

//     function onDocumentLoadSuccess({ numPages }) {
//         setNumPages(numPages);
//     }

//     return (
//         <div>
//             <Document
//                 file={document}
//                 //"somefile.pdf"
//                 onLoadSuccess={onDocumentLoadSuccess}
//             >
//                 <Page pageNumber={pageNumber} />
//             </Document>
//             <p>Page {pageNumber} of {numPages}</p>
//         </div>
//     );
// }

// export default displayDeclaration;