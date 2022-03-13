| Property   | Required | Default value | Description                                             |
| ---------- | -------- | ------------- | ------------------------------------------------------- |
| coopId     | Yes      |               | Your coopId to connect to your cloud server             |
| server_url | No       |               | Specify the url of your smart kotkot instance if needed |
| camera     | No       | []            | Camera list                                             |

camera properties

| Property    | Required | Default value | Description                                               |
| ----------- | -------- | ------------- | --------------------------------------------------------- |
| name        | Yes      |               | The name of the camera                                    |
| module      | Yes      |               | One the this modules : `UsbWebcam` or `RaspberryPiWebcam` |
| options     | Yes      |               | Options                                                   |
| intervalSec | Yes      |               | interval in seconds between screenshot                    |

@TODO
