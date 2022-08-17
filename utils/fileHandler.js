const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const imgExtensionAllowed = ['jpeg', 'png'];
const contentExtensionAllowed = ['pdf', 'jpeg', 'png', 'mp4', 'pptx', 'zip'];

const saveFile = ({ path, size, mimetype, location }, allowExtension) => {
    try {
        const [, extension] = mimetype.split('/');
        // if (!allowExtension.includes(extension))  //weight/type verification
        //     throw new Error('Formato no permitido');


        const uid = uuidv4();
        const fileName = `${uid}.${extension}`; //give the file a unique name


        return location;


        throw new Error('El archivo es muy pesado')


    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
}

const imgFile = (file) => {
    return saveFile(file, imgExtensionAllowed);
}

const pdfFile = (file) => {
    return saveFile(file, contentExtensionAllowed);
}

module.exports = { imgFile, pdfFile };