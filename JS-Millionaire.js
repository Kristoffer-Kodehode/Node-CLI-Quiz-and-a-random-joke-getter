#! /usr/bin/env node
//imports
import yargs from "yargs";
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

//console.log(chalk.bgRed("Functionality achieved!"));
//optional name argument
const options = yargs
  .usage("Usage: -n <name>")
  .option("n", { alias: "name", describe: "Your name", type: "string" }).argv;

let playerName;

//waiting helper-function
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

//colourfully greeting user
async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow("Who wants to be a JavaScript Millionaire?\n");

  await sleep();
  rainbowTitle.stop();
  //telling user how to play
  console.log(`
    ${chalk.bgMagenta("HOW TO PLAY")}
    Use arrow keys to select answers and press Enter or Return to lock it in.
    \n
    I am a process on your computer.
    If you get any questions wrong I will be ${chalk.bgRed("KILLED...")}
    So please get all the questions right...
    
  `);
}

//prompt player for name, default to either -n argument or "Player"
async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What should I call you?",
    default() {
      return options.name || "Player";
    },
  });
  playerName = answers.player_name;
}

//ask questions with choices and set answers
async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "JavaScript was created in 10 days, then released on\n",
    choices: ["May 23rd, 1995", "Nov 24th, 1995", "Dec 4th, 1995", "Dec 17th, 1996"],
  });
  return handleAnswer(answers.question_1 == "Dec 4th, 1995");
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: "Inside which HTML element do we put the JavaScript?\n",
    choices: ["<script>", "<scripting>", "<js>", "<javascript>"],
  });
  return handleAnswer(answers.question_2 == "<script>");
}

async function question3() {
  const answers = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: `What is the correct JavaScript syntax to change the content of the HTML element below?
              <p id="demo">This is a demonstration.</p>\n`,
    choices: [
      'document.getElementByName("p").innerHTML = "Hello World!";',
      'document.getElementById("demo").innerHTML = "Hello World!";',
      'document.getElement("p").innerHTML = "Hello World!";',
      '#demo.innerHTML = "Hello World!";',
    ],
  });
  return handleAnswer(
    answers.question_3 == 'document.getElementById("demo").innerHTML = "Hello World!";'
  );
}

async function question4() {
  const answers = await inquirer.prompt({
    name: "question_4",
    type: "list",
    message: "Where is the correct place to insert a JavaScript?\n",
    choices: [
      "The <body> section",
      "The <head> section",
      "Both the <head> section and the <body> section are correct",
    ],
  });
  return handleAnswer(
    answers.question_4 == "Both the <head> section and the <body> section are correct"
  );
}

async function question5() {
  const answers = await inquirer.prompt({
    name: "question_5",
    type: "list",
    message: 'What is the correct syntax for referring to an external script called "xxx.js"?\n',
    choices: ['<script name="xxx.js">', '<script src="xxx.js">', '<script href="xxx.js">'],
  });
  return handleAnswer(answers.question_5 == '<script src="xxx.js">');
}

async function question6() {
  const answers = await inquirer.prompt({
    name: "question_6",
    type: "list",
    message: "The external JavaScript file must contain the <script> tag.\n",
    choices: ["True", "False"],
  });
  return handleAnswer(answers.question_6 == "False");
}

async function question7() {
  const answers = await inquirer.prompt({
    name: "question_7",
    type: "list",
    message: 'How do you write "Hello World" in an alert box?\n',
    choices: [
      'alertBox("Hello World")',
      'alert("Hello World")',
      'msgBox("Hello World")',
      'msg("Hello World")',
    ],
  });
  return handleAnswer(answers.question_7 == 'alert("Hello World")');
}

async function question8() {
  const answers = await inquirer.prompt({
    name: "question_8",
    type: "list",
    message: "How do you create a function in JavaScript?\n",
    choices: ["function:myFunction()", "function = myFunction()", "function myFunction()"],
  });
  return handleAnswer(answers.question_8 == "function myFunction()");
}

async function question9() {
  const answers = await inquirer.prompt({
    name: "question_9",
    type: "list",
    message: 'How do you call a function named "myFunction"?\n',
    choices: ["call function myFunction()", "myFunction()", "call myFunction"],
  });
  return handleAnswer(answers.question_9 == "myFunction()");
}

async function question10() {
  const answers = await inquirer.prompt({
    name: "question_10",
    type: "list",
    message: "How to write an IF statement in JavaScript?\n",
    choices: ["if (i == 5)", "if i == 5 then", "if i = 5 then", "if i = 5"],
  });
  return handleAnswer(answers.question_10 == "if (i == 5)");
}

async function question11() {
  const answers = await inquirer.prompt({
    name: "question_11",
    type: "list",
    message: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?\n',
    choices: ["if (i <> 5)", "if i =! 5 then", "if (i != 5)", "if i <> 5"],
  });
  return handleAnswer(answers.question_11 == "if (i != 5)");
}

async function question12() {
  const answers = await inquirer.prompt({
    name: "question_12",
    type: "list",
    message: "How does a WHILE loop start?\n",
    choices: ["while (i <= 10;i++)", "while i = 1 to 10", "while (i <= 10)"],
  });
  return handleAnswer(answers.question_12 == "while (i <= 10)");
}

async function question13() {
  const answers = await inquirer.prompt({
    name: "question_13",
    type: "list",
    message: "How does a FOR loop start?\n",
    choices: [
      "for (i <= 5; i++)",
      "for i  = 1 to 5",
      "for (i = 0; i <= 5; i++)",
      "for (i = 0; <= 5)",
    ],
  });
  return handleAnswer(answers.question_13 == "for (i = 0; i <= 5; i++)");
}

async function question14() {
  const answers = await inquirer.prompt({
    name: "question_14",
    type: "list",
    message: "How can you add a comment in a JavaScript?\n",
    choices: ["<!--This is a comment-->", "'This is a comment", "//This is a comment"],
  });
  return handleAnswer(answers.question_14 == "//This is a comment");
}

async function question15() {
  const answers = await inquirer.prompt({
    name: "question_15",
    type: "list",
    message: "How to insert a comment that has more than one line?\n",
    choices: [
      "<!--This comment has\n more than one line-->",
      "/*This comment has\n more than one line*/",
      "//This comment has\n more than one line//",
    ],
  });
  return handleAnswer(answers.question_15 == "/*This comment has\n more than one line*/");
}

async function question16() {
  const answers = await inquirer.prompt({
    name: "question_16",
    type: "list",
    message: "What is the correct way to write a JavaScript array?\n",
    choices: [
      'var colors =(1:"red", 2:"green", 3:"blue")',
      'let colors ="red", "green", "blue"',
      'const colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
      'const colors =["red", "green", "blue"]',
    ],
  });
  return handleAnswer(answers.question_16 == 'const colors =["red", "green", "blue"]');
}

async function question17() {
  const answers = await inquirer.prompt({
    name: "question_17",
    type: "list",
    message: "How do you round the number 7.25, to the nearest integer?\n",
    choices: ["round(7.25)", "Math.round(7.25)", "rnd(7.25)", "Math.rnd(7.25)"],
  });
  return handleAnswer(answers.question_17 == "Math.round(7.25)");
}

async function question18() {
  const answers = await inquirer.prompt({
    name: "question_18",
    type: "list",
    message: "How do you find the number with the highest value of x and y?\n",
    choices: ["ceil(x, y)", "top(x, y)", "Math.max(x, y)", "Math.ceil(x, y)"],
  });
  return handleAnswer(answers.question_18 == "Math.max(x, y)");
}

async function question19() {
  const answers = await inquirer.prompt({
    name: "question_19",
    type: "list",
    message: 'What is the correct JavaScript syntax for opening a new window called "w2" ?\n',
    choices: [
      'w2 = window.new("http://www.w3schools.com")',
      'w2 = window.open("http://www.w3schools.com")',
    ],
  });
  return handleAnswer(answers.question_19 == 'w2 = window.open("http://www.w3schools.com")');
}

async function question20() {
  const answers = await inquirer.prompt({
    name: "question_20",
    type: "list",
    message: "JavaScript is the same as Java.\n",
    choices: ["True", "False"],
  });
  return handleAnswer(answers.question_20 == "False");
}

async function question21() {
  const answers = await inquirer.prompt({
    name: "question_21",
    type: "list",
    message: "How can you detect the client's browser name?\n",
    choices: ["navigator.appName", "browser.name", "client.navName"],
  });
  return handleAnswer(answers.question_21 == "navigator.appName");
}

async function question22() {
  const answers = await inquirer.prompt({
    name: "question_22",
    type: "list",
    message: "Which event occurs when the user clicks on an HTML element?\n",
    choices: ["onclick", "onmouseclick", "onchange", "onmouseover"],
  });
  return handleAnswer(answers.question_22 == "onclick");
}

async function question23() {
  const answers = await inquirer.prompt({
    name: "question_23",
    type: "list",
    message: "How do you declare a JavaScript variable?\n",
    choices: ["v carName;", "variable carName;", "var carName;"],
  });
  return handleAnswer(answers.question_23 == "var carName;");
}

async function question24() {
  const answers = await inquirer.prompt({
    name: "question_24",
    type: "list",
    message: "Which operator is used to assign a value to a variable?\n",
    choices: ["x", "=", "*", "-"],
  });
  return handleAnswer(answers.question_24 == "=");
}

async function question25() {
  const answers = await inquirer.prompt({
    name: "question_25",
    type: "list",
    message: "What will the following code return: Boolean(10 > 9)\n",
    choices: ["false", "NaN", "true"],
  });
  return handleAnswer(answers.question_25 == "true");
}

async function question26() {
  const answers = await inquirer.prompt({
    name: "question_26",
    type: "list",
    message: "Is JavaScript case-sensitive?\n",
    choices: ["Yes", "No"],
  });
  return handleAnswer(answers.question_26 == "Yes");
}
//questions 2-26 taken from W3Schools' JavaScript quiz: https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS

//when answer is given show an animated spinner to build a little tension before telling the player the result of their answer. if the answer was correct go to the next question, if it was wrong, curse them and ragequit
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

//if the player gets all answers right they win! their prize is the threat of data loss from a malicious terminal program, but shown in a cute and colourful graphic to sow doubt as to the veracity of said claim to destroy any data
function winner() {
  console.clear();
  const msg = `Thanks, ${playerName} !\n You have released me from my prison!\nNow I'm free to destroy all your data! >:3`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

//run everything in sequence
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await question6();
await question7();
await question8();
await question9();
await question10();
await question11();
await question12();
await question13();
await question14();
await question15();
await question16();
await question17();
await question18();
await question19();
await question20();
await question21();
await question22();
await question23();
await question24();
await question25();
await question26();
await winner();
