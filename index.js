#! /usr/bin/env node
//imports
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

//console.log(chalk.bgRed("Functionality achieved!"));

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow("Who wants to be a JavaScript Millionaire?\n");

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgMagenta("HOW TO PLAY")}
    I am a process on your computer.
    If you get any questions wrong I will be ${chalk.bgRed("KILLED...")}
    So please get all the questions right...
    
  `);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What should I call you?",
    default() {
      return "Player";
    },
  });
  playerName = answers.player_name;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "JavaScript was created in 10 days, then released on\n",
    choices: ["May 23rd, 1995", "Nov 24th, 1995", "Dec 4th, 1995", "Dec 17th, 1996"],
  });
  return handleAnswer(answers.question_1 == "Dec 4th, 1995");
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName} ! Correct!` });
  } else {
    spinner.error({ text: `💀💀💀 DAMN YOU ${playerName} !!!⚰️` });
    process.exit(1);
  }
}

function winner() {
  console.clear();
  const msg = `Thanks, ${playerName} !\n Now I'm free to destroy all your data! 😈`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

await welcome();
await askName();
await question1();
await winner();
