# Space Bucket Dashboard

Enhances a Space Bucket with a sweet dashboard

# Getting Started

## Prerequisites

* [node.js](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)
* Python
* [Adafruit Python GPIO](https://github.com/adafruit/Adafruit_Python_GPIO)
* MongoDB
* [Dropbox Token](http://dropbox.com/developers/apps) - Create an application, then generate an access token (which is unique to you)

## Running

First, get the repository and install the dependencies

```
git clone https://github.com/andrewburgess/space-bucket-pi space-bucket-pi
cd space-bucket-pi
npm install
```

To run the development version (which uses `nodemon` and hot reloading `webpack`)

```
sudo npm start
```

To run the production version (which will compile the client scripts)

```
sudo npm run build
sudo npm run start:prod
```

_Note: you need to run with `sudo` to read/write to the pins_

## Configuring

These are the available configuration values that should be set before running. These can be
defined as Environment Variables, via the command line, or in a `config.${NODE_ENV}.json`
file.

| Key             | Env Name          | CLI Arg         | Description                        |
|-----------------|-------------------|-----------------|------------------------------------|
| `cron`          | `CRON`            | `cron`          | Cron Tab string used for capturing an image, uploading to dropbox, and saving environment record |
| `dropbox.token` | `DROPBOX_TOKEN`   | `dropbox-token` | Access token for your dropbox app  |
| `log`           | `LOG`             | `log`           | Logfile location                   |
| `photocell.pin` | `PHOTOCELL_PIN`   | `photocell-pin` | Pin number on the raspberry pi (defaults to #37) |
| `port`          | `PORT`            | `port`          | Port number the server listens on  |

The mongodb connection string defaults to `localhost` with no username/password
