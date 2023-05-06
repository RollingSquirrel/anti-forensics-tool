# Anti-Forensics-Tool

This anti-forensics tool demonstrates file metadata manipulation.

This is a multi-platform desktop application built with [Electron](https://www.electronjs.org/).
Electron separates the application logic from the user interface by using a main process and renderer processes.

The main process allows us to access the file system and execute commands on the operating system.
This is the major difference to a web application, which is restricted to the browser sandbox.

## Installation

Installers for Windows and Linux are provided in the release tab.
After running the installer you can open the tool from your start menu / application overview.

### Windows

Run the installer and follow the instructions.

### Linux

The linux installer is a debian package. Install it with the following command:

```bash
sudo dpkg -i anti-forensics-tool_1.0.0_amd64.deb
```

## Start in Development Mode

The following tools are required:

- [Node.js](https://nodejs.org/en/)
- [Visual Studio Code](https://code.visualstudio.com/) (optional)

Before starting you have to install the dependencies:

```bash
npm install
```

To start the application in development mode, run the following command:

```bash
npm run start
```

Please note that hot-reloading is currently not supported.
You will have to reload the browser window with `Ctrl + R` after making changes.

## Build Distributable

For building a distributable installer you need the operating system you want to build for.
For example, if you want to build a Windows installer, you need to run the build command on a Windows machine.
Same applies for linux.
MacOS is currently not supported.

```bash
npm run make
```
