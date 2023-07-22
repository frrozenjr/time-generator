const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let minuteCap = 99999999;
let secondCap = 99999999;

let seconds = 0;
let minutes = 0;
let realseconds = "";
let string = "";

function pressAnyKeyToContinue() {
  return new Promise((resolve) => {
    console.log("Press any key to close the program...");

    process.stdin.setRawMode(true);
    process.stdin.resume();

    process.stdin.once('keypress', () => {
      process.stdin.setRawMode(false);
      process.stdin.pause();

      resolve();
    });
  });
}

rl.question('Enter a minute cap: ', function(mcap) {
  minuteCap = JSON.parse(mcap);
  rl.question('Enter a second cap: ', async function(scap) {
    secondCap = JSON.parse(scap);

    await code();

    rl.close();
  });
});

async function code() {
  while (true) {
    if (minuteCap > 59 || secondCap > 59 || secondCap < 0 || minuteCap < 1) {
      console.log("Invalid input");
      pressAnyKeyToContinue();
      break;
    } else {
      console.log("Generating");
      seconds += 1;
      if (seconds == 60) {
        seconds = 0;
        minutes += 1;
      }
      if (seconds.toString().length == 1) {
        realseconds = "0" + seconds.toString();
      } else {
        realseconds = seconds.toString();
      }
      if (minutes == minuteCap && seconds == secondCap) {
        string = string + minutes + ":" + realseconds;
        console.log(string);
        await pressAnyKeyToContinue();
        break;
      }
      string = string + minutes + ":" + realseconds + ",";
    }
  }
}
