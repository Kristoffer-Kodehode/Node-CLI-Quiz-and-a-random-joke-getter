#! /usr/bin/env node
//imports
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

console.log(chalk.bgRed("Functionality achieved!"));

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow("Who wants to be a JavaScript Millionaire?\n");

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgMagenta("HOW TO PLAY")}
    I am a process on your computer.
    If you get any questions wrong I will be ${chalk.bgRedBright("KILLED...")}
    So please get all the questions right...
    
  `);
}

welcome();
