const { Storage } = require('@google-cloud/storage');
const path = require('path');
const storage = new Storage({ keyFilename: path.join(__dirname, '../firebaseConfig.json') });

const bucketName = "your-bucket-name";

const uploadFile = async (filePath, fileName) => {
    try {
        await storage.bucket(bucketName).upload(filePath, {
            destination: fileName,
            public: true,
        });
        return `https://storage.googleapis.com/${bucketName}/${fileName}`;
    } catch (error) {
        console.error("File Upload Failed", error);
        throw error;
    }
};

module.exports = uploadFile;
