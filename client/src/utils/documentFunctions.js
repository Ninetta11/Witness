import axios from 'axios';
import { jsPDF } from "jspdf";
import emailjs from 'emailjs-com';


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

export const sendRequestEmail = (event) => {
    return new Promise((function (resolve, reject) {
        event.preventDefault();
        emailjs.sendForm('service_g08r9gt', 'template_mxutnel', event.target, 'user_0NKMgomXkCiFBTZolgjDK')
            .then((result) => {
                resolve({ type: 'success', message: 'Your request has been sent.' });
            }, (error) => {
                reject({ type: 'error', message: 'There was a problem sending your request. Please check your details and try again.' });
            });
    }))
}

export const sendDocumentEmail = (event) => {
    return new Promise((function (resolve, reject) {
        event.preventDefault();
        emailjs.sendForm('service_g08r9gt', 'template_gev2269', event.target, 'user_0NKMgomXkCiFBTZolgjDK')
            .then((result) => {
                resolve({ type: 'success', message: 'Your document has been sent.' });
            }, (error) => {
                reject({ type: 'error', message: 'There was a problem sending your document. Please try again.' });
            });
    }))
}
