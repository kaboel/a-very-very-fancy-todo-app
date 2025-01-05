const fs = require("fs");
const readline = require("readline");
const path = require("path");
const crypto = require("crypto");
const { exec } = require("child_process");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error executing command: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`stderr: ${stderr}`);
        return;
      }
      resolve(stdout);
    });
  });
};

const initForm = async () => {
  const questions = [
    "Enter your PostgreSQL username: ",
    "Enter your PostgreSQL password: ",
    "Enter your PostgreSQL database name: ",
    "Enter your PostgreSQL db_schema (default: none): ",
    "Enter your PostgreSQL host (default: localhost): ",
    "Enter your PostgreSQL port (default: 5432): ",
  ];
  const answers = [];
  for (const question of questions) {
    answers.push(await new Promise((resolve) => rl.question(question, resolve)));
  }
  rl.close();
  return answers;
};

const generateEnv = async () => {
  const envPath = path.join(__dirname, "../.env");
  if (fs.existsSync(envPath)) {
    console.log(".env file already exists. Skipping generation.\n\n");
    return;
  }

  const [
    username,
    password,
    dbName,
    schema,
    host,
    port,
  ] = await initForm();
  const dbUrl = `postgresql://${username}:${password}@${host || 'localhost'}:${port || '5432'}/${dbName}${schema ? `?schema=${schema}` : ''}`;
  const jwtSecret = crypto.randomBytes(64).toString("hex");

  const envContent = `
SERVER_PORT=3000
JWT_SECRET=${jwtSecret}
DATABASE_URL=${dbUrl}
CLIENT_ORIGIN=http://localhost:8000
  `;
  fs.writeFileSync(envPath, envContent.trim(), "utf-8");
  console.log(".env file generated!");
};

const migrateDatabase = async () => {
  try {
    console.log("Preparing database...");
    const result = await runCommand("npx prisma migrate dev --name init");
    console.log(result);
  } catch (error) {
    console.error("Database migration failed:", error.message);
    process.exit(1);
  }
};

const makeUploadsDir = () => {
  const folderPath = path.join(__dirname, "../uploads");

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.log("Folder /uploads created at root!");
  }
};

(async function initializeApp() {
  makeUploadsDir();
  await generateEnv();
  await migrateDatabase();
})()
  .then(() => {
    console.log("Project initialized!");
    console.log("\nYou may now run `npm run dev` to start the server.");
    process.exit();
  })
  .catch((err) => {
    console.error("An error occurred:", err);
    process.exit(1);
  });
