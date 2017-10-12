var fs = require('fs-extra');

function Remover(nameVideo,nameImage) {
    this.nameVideo = nameVideo;
    this.nameImage = nameImage;
    pathImage = '../client-angular/uploads/';
    pathImageThumbnails = '../client-angular/uploads/thumbnails/';
    pathVideo = '../client-angular';
}
Remover.prototype.removeVideo = function (nameVideo) {
    if(fs.existsSync(pathVideo + nameVideo)) {
        fs.unlinkSync(pathVideo + nameVideo);
    }
};
Remover.prototype.removeImage = function (nameImage) {
    if (nameImage) {
        var arr = nameImage.split(';');
        arr.forEach(function (image) {
            // fs.unlinkSync(this.pathImage + image);

            fs.remove(pathImage + image, function (err) {
                if (err) return console.error(err);
                console.log('success!')
            });
        });
    }
};

Remover.prototype.removeImageThumbnails = function (nameImage) {
    if (nameImage) {
        var arr = nameImage.split(';');
        arr.forEach(function (image) {
            // fs.unlinkSync( '../client-angular/uploads/thumbnails/' + image);

            fs.remove(pathImageThumbnails + image, function (err) {
                if (err) return console.error(err);
                console.log('success!')
            });
        });
    }
};

module.exports = new Remover();