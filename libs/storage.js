const multer = require('multer');
const fs = require('fs'); 

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        fs.mkdir('./uploads', function (err) {
            if (err) {
                console.log(err.stack)
            } else {
                callback(null, './uploads');
            }
        })
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

const upload = multer({ storage })

module.exports = upload