import axios from 'axios';
import { jsPDF } from "jspdf";

export const saveDocument = (documentData) => {
    return axios.post('/api/document', {
        IOTA_address: documentData.IOTA_address,
        hash: documentData.hash,
        title: documentData.title
    })
}

export const saveToPDF = (title, content) => {
    const doc = new jsPDF();

    doc.text(content, 10, 10);
    doc.save(title + '.pdf');
}


