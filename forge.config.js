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
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: 'Lukas Weigl',
          homepage: 'https://anti-forensics.vercel.app/',
          icon: path.join(__dirname, 'static', 'icon.jpeg'), // Path to the icon file for the app
        },
      },
    }
  ],
  
};