const { exec } = require("node:child_process");

const maxTries = 30;
const retryInterval = 5000;

let tries = 0;

function checkDatabase() {
  console.log(`Tentativa ${tries + 1} de ${maxTries}`);

  const command = `docker exec postgres-dev pg_isready`;

  exec(command, (error, stdout) => {
    checkStatus = stdout;
    if (error) {
      if (tries < maxTries - 1) {
        setTimeout(checkDatabase, retryInterval);
        tries++;
      } else {
        console.error(
          "Não foi possível estabelecer uma conexão com o bando de dados",
        );
        process.exit(1);
      }
    } else {
      console.log("Check status: ", checkStatus);
    }
  });
}

checkDatabase();
