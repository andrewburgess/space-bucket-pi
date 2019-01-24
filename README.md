# Space Bucket PI

Monitoring and timelapse photography of a micro grow operation

## Configuration

The server is configured using environment variables

```
CRON            Cron tab for capturing images
DROPBOX_TOKEN   Token used for communicating with Dropbox
LOG_LEVEL       Verbosity of the logger, defaults to "info"
PHOTOCELL_PIN   Pin that photocell exists on
PORT            Port to listen on, defaults to 3001
```

The app is also configured using environment variables

```
REACT_APP_REMOTE_PORT       Remote port of API server, defaults to 3001
```
