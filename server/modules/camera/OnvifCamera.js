const CameraAbstract = require("./CameraAbstract");
const { exec } = require("child_process");
import { Cam } from "onvif";

class OnvifCamera extends CameraAbstract {
  cameraConfig;
  camera;

  constructor(camera) {
    super();

    const self = this;

    new Cam(
      {
        hostname: camera.options.hostname,
        username: camera.options.username,
        password: camera.options.password,
        port: camera.options.port || 80,
      },
      async function (err) {
        if (err) console.error(err);
        else {
          console.log("[CAMERA] Onvif camera setup");
          self.camera = this;

          const streamUri = await self.getStreamUri();
          const snapUri = await self.getSnapshotUri();

          self.streamUri = streamUri.replace(
            "rtsp://",
            `rtsp://${camera.options.username}:${camera.options.password}@`
          );
          self.snapshotUri = snapUri.replace(
            "http://",
            `http://${camera.options.username}:${camera.options.password}@`
          );
        }
      }
    );

    this.cameraConfig = camera;
  }

  async getCapabilities() {
    return {
      canLiveStream: true,
      canTakePicture: true,
      canMove: true,
    };
  }

  async goToPreset(index) {
    if (!this.camera) throw new Error("Camera instance not found");

    return new Promise((resolve) => {
      this.camera.gotoPreset({ preset: String(index) }, () => resolve());
    });
  }

  async getStreamUri() {
    if (!this.camera) throw new Error("Camera instance not found");

    return new Promise((resolve, reject) => {
      this.camera.getStreamUri(function (error, result) {
        if (error) reject(error);
        else resolve(result.uri);
      });
    });
  }

  async getSnapshotUri() {
    if (!this.camera) throw new Error("Camera instance not found");

    return new Promise((resolve, reject) => {
      this.camera.getSnapshotUri(function (error, result) {
        if (error) reject(error);
        else resolve(result.uri);
      });
    });
  }

  async takePicture() {
    if (!this.camera) throw new Error("Camera instance not found");

    return new Promise((resolve, reject) => {
      exec(`curl -s ${this.snapshotUri}?base64=yes`, (error, res) => {
        if (error) reject(error);
        else resolve(Buffer.from(res, "base64"));
      });
    });
  }
}

module.exports = OnvifCamera;
