const fs = require('fs')
const path = require('path')

const filePath = path.join(require.main.filename)

// console.log(filePath);

const fileRemove = async (filename) => {
    try {
        await fs.unlink(filePath + '/../../public/images/desktop/' + filename, (err) => {
            if (err) {
                throw new Error
            } else {
                console.log('File removed');
            }
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = fileRemove