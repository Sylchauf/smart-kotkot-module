const RaspberryPiWebcam = require("./RaspberryPiWebcam");
const UsbWebcam = require("./UsbWebcam");
const OnvifCamera = require("./OnvifCamera");

const getCameraInstance = (camera) => {
  switch (camera.module) {
    case "RaspberryPiWebcam":
      return new RaspberryPiWebcam(camera);
    case "UsbWebcam":
      return new UsbWebcam(camera);
    case "OnvifCamera":
      return new OnvifCamera(camera);
  }
};

exports.getCameraInstance = getCameraInstance;
