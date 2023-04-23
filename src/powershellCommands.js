const { exec } = require("child_process");



async function changeCreationTime(filePath, creationTime) {
  const year = creationTime.getFullYear();
  const month = String(creationTime.getMonth() + 1).padStart(2, "0");
  const day = String(creationTime.getDate()).padStart(2, "0");

  const creationTimeFormatted = `${year}-${month}-${day}`;
  
  const command = `powershell.exe -Command "Set-ItemProperty -Path '${filePath}' -Name CreationTime -Value '${creationTimeFormatted}'"`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing PowerShell command: ${error}`);
      return;
    }

    if (stderr) {
      console.error(`PowerShell error output: ${stderr}`);
      return;
    }

    console.log(`PowerShell output: ${stdout}`);
  });
}

module.exports.changeCreationTime = changeCreationTime;
