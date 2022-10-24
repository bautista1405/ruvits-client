const { imgFile, pdfFile } = require('../utils/fileHandler');

const handleStore = (body, files) => {
    //const urlFiles = files.map((file) => imgFile(file));
    // console.log(urlFiles);
    const pdfFiles = files.map((file) => pdfFile(file));
    console.log(pdfFiles);
    const userStore = { ...body, banner: pdfFiles };
    return userStore;
}

module.exports = { handleStore };