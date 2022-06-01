class CameraAbstract {
  streamUri;
  snapshotUri;
  cameraConfig;

  constructor(camera) {
    this.cameraConfig = camera;
    // The constructor can be useful to initialize something
    return null;
  }

  async takePicture() {
    // Take a picture and return a buffer containing the image
  }

  async getCapabilities() {
    return {
      canLiveStream: false,
      canTakePicture: false,
      canMove: false,
    };
  }
}

module.exports = CameraAbstract;
