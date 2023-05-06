const path = require('path');

module.exports = {
  packagerConfig: {
    icon: "/static/icon"
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        options: {
          icon: path.join(__dirname, 'static', 'icon.ico'),
        },
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
      config: {
        icon: path.join(__dirname, 'static', 'icon.png'),
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        icon: path.join(__dirname, 'static', 'icon.png'),
      },
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: path.join(__dirname, 'static', 'icon.png'),
        },
      },
    },
  ],
};
