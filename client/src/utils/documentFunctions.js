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
    const doc = new jsPDF('p', 'pt', 'letter');
    let formatContent = 'Statutory Declaration \n';
    content.split('#').map((section) => {
        formatContent += section;
    });
    const splitText = doc.splitTextToSize(formatContent, 500)
    doc.text(splitText, 50, 50)
    doc.save(title + '.pdf');
}

export const sendRequestEmail = (first_name, last_name, to_email, to_name, document_type, message) => {
    return new Promise((function (resolve, reject) {
        emailjs.send('service_g08r9gt', 'template_mxutnel', {
            from_name: first_name + " " + last_name,
            to_email: to_email,
            to_name: to_name,
            document_type: document_type,
            message: message,
            content: 'none'
        },
            'user_0NKMgomXkCiFBTZolgjDK')
            .then((result) => {
                resolve({ type: 'success', message: 'Your request has been sent.' });
            }, (error) => {
                reject({ type: 'error', message: 'There was a problem sending your request. Please check your details and try again.' });
            });
    }))
}

export const sendDocumentEmail = (to_email, to_name, message, first_name, last_name, title, hash) => {
    return new Promise((function (resolve, reject) {
        emailjs.send('service_g08r9gt', 'template_gev2269', {
            from_name: first_name + " " + last_name,
            to_name: to_name,
            to_email: to_email,
            document_title: title + "- " + hash,
            message: message,
        },
            'user_0NKMgomXkCiFBTZolgjDK')
            .then((result) => {
                resolve({ type: 'success', message: 'Your document has been sent.' });
            }, (error) => {
                reject({ type: 'error', message: 'There was a problem sending your document. Please try again.' });
            });
    }))
}