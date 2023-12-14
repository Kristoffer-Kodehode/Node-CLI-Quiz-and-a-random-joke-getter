#!/usr/bin/env node
//imports
import yargs from "yargs";
import axios from "axios";
import figlet from "figlet";
import gradient from "gradient-string";
//argument options
const options = yargs
  .usage("Usage: -n <name>")
  //non-optional name
  .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
  //optional search term for joke
  .option("s", { alias: "search", describe: "Search term", type: "string" }).argv;

const greeting = `Hello, ${options.name}!`;
console.log(greeting);
//if we have search term, confirm that, if not tell user the joke they get is random
if (options.search) {
  console.log(`Searching for jokes about ${options.search}`);
} else {
  console.log("here's a random joke for you:");
}
//if we have search term use url with search query, if not use base
const url = options.search
  ? `https://icanhazdadjoke.com/search?term=${options.search}`
  : "https://icanhazdadjoke.com/";
//fetch joke based on search, or random, if search, but no joke was found show user you're also crying due to your failure
axios.get(url, { headers: { Accept: "application/json" } }).then((res) => {
  if (options.search) {
    res.data.results.forEach((j) => {
      console.log("\n" + j.joke);
    });
    if (res.data.results.length === 0) {
      const msg = "no such jokes found ;-;";
      figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
      });
      //console.log("no such jokes found ;-;");
    }
  } else {
    console.log(res.data.joke);
  }
});
