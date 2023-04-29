const { exec } = require("child_process");

async function changeCreationTime(filePath, creationTime, platform) {
  const year = creationTime.getFullYear();
  const month = String(creationTime.getMonth() + 1).padStart(2, "0");
  const day = String(creationTime.getDate()).padStart(2, "0");

  const creationTimeFormatted = `${year}-${month}-${day}`;
  let platformSpecificCommand = "";

  if (platform == "win32") {
    platformSpecificCommand = `powershell.exe -Command "Set-ItemProperty -Path '${filePath}' -Name CreationTime -Value '${creationTimeFormatted}'"`;
  } else {
    platformSpecificCommand = `touch -c -d ${creationTimeFormatted} ${filePath}`;
  }

  await new Promise((resolve, reject) => {
    exec(platformSpecificCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error}`);
        reject(error);
      }

      if (stderr) {
        console.error(`Error output: ${stderr}\n\n`);
      }

      console.log(`Command output: ${stdout}`);
      resolve(stdout);
    });
  });
}

module.exports.changeCreationTime = changeCreationTime;
