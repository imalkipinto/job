const pdfParse = require('pdf-parse');
const fs = require('fs');

const extractCVData = async (filePath) => {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text;

    return {
        education: text.match(/(Bachelor|Master|PhD|Diploma|Certificate)/g) || [],
        qualifications: text.match(/(Certified|Expert|Trained|Course)/g) || [],
        projects: text.match(/(Project|Research|Developed)/g) || [],
    };
};

module.exports = extractCVData;
