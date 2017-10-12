var jimp = require('jimp');

function Resizer(pathToImage, imageName) {
    this.pathToSave = '../client-angular/uploads/thumbnails/';
}

Resizer.prototype.resize = function(pathToImage, imageName){

    jimp.read(pathToImage, function (err, image) {
        if (err) console.log(err);
        image.contain(320, 320)
            .background(0xFFFFFFFF)
            .write('../client-angular/uploads/thumbnails/' + imageName);
    });
};

module.exports = new Resizer();