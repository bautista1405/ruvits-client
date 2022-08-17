const { imgFile, pdfFile } = require('../utils/fileHandler');

const createProduct = (body, files) => {
    //const urlFiles = files.map((file) => imgFile(file));
    // console.log(urlFiles);
    const pdfFiles = files.map((file) => pdfFile(file));
    console.log(pdfFiles);
    const newProduct = { ...body, content: pdfFiles };
    return newProduct;
}

module.exports = { createProduct };