const fs = require('fs');

const create_dir = async (dir) => {

    await fs.mkdir(dir, {
        recursive: true
    }, function (err) {
        (err) ? console.log(err) : console.log(`${dir} successfully created.`)
    })
}

module.exports = {
    create_dir
}



