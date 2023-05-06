module.exports = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        outputDirectory: '.'
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
      config: {
        outputDirectory: '.'
      },
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        outputDirectory: '.'
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        outputDirectory: '.'
      },
    },
  ],
};