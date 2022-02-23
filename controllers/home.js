const path = require('path')
const { MongoClient, GridFSBucket } = require('mongodb')
const upload = require('../middleware/mw')
const config = process.env;

const baseUrl = "http://localhost:7030/files/"
const mongoClient = new MongoClient(config._URL);

exports.getIndex = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
}

exports.uploadFiles = async (req, res) => {
    try {
        await upload(req, res)
        if (req.files.lenght <= 0) {
            return res.status(400).send({ msg: "You must select at least 1 file" })
        }

        return res.status(200).send({ msg: "Files have been uploaded" })

    } catch (err) {
        console.log(err)
        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).send({
                message: "Too many files to upload.",
            });
        }
        return res.status(500).send({
            message: `Error when trying upload many files: ${error}`,
        });

    }
}


exports.getAllFiles = async (req, res) => {
    try {

        await mongoClient.connect()
        const database = mongoClient.db(config.DB)
        const images = database.collection('photos.files')

        const cursor = images.find()

        if ((await images.countDocuments()) < 1) {
            return res.status(500).send({ msg: "No files found!" })
        }

        let fileInfos = []
        await cursor.forEach(file => {
            fileInfos.push({
                name: file.filename,
                url: baseUrl + file.filename
            })
        })

        return res.status(200).send(fileInfos)

    } catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}