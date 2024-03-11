
var ImageKit = require("imagekit");

exports.imgkitinitilize = () => {
    var imagekit = new ImageKit({
        publicKey : "public_jHiGM2oA7G0QvFbRzlw6RVvDj+8=",
        privateKey : "private_D8rXCebFmpcfqwYEQo4RlcTdHnc=",
        urlEndpoint : "https://ik.imagekit.io/4lycmlpd6",
    });
    return imagekit;
}