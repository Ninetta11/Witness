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

export const requestDocument = (event) => {
    console.log(event.target);
    event.preventDefault();
    emailjs.sendForm('service_g08r9gt', 'template_mxutnel', event.target, 'user_0NKMgomXkCiFBTZolgjDK')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
}

export const sendDocument = (event) => {
    event.preventDefault();
    emailjs.sendForm('service_g08r9gt', 'template_gev2269', event.target, 'user_0NKMgomXkCiFBTZolgjDK')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
}
