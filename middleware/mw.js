const util = require('util')
const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage')

const storage = new GridFsStorage({
    url: "mongodb://localhost:27017/image_upload",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return {
            bucketName: 'photos',
            filename: 'file_' + Date.now()
        }
    },
})

const uploadFiles = multer({ storage }).array("file", 10);
const uploadFilesMiddleware = util.promisify(uploadFiles)
module.exports = uploadFilesMiddleware
