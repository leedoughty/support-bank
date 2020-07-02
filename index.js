const fs = require("fs");
const parse = require("csv-parse/lib/es5");
const readlineSync = require("readline-sync");
const log4js = require("log4js");

log4js.configure({
  appenders: {
    file: { type: "fileSync", filename: "logs/debug.log" },
  },
  categories: {
    default: { appenders: ["file"], level: "debug" },
  },
});

const logger = log4js.getLogger("debug.log");

function output(err, output) {
  if (err) throw err;
  let mappedOutput = output.map(
    (element) =>
      new Transaction(
        element.Date,
        element.From,
        element.To,
        element.Narrative,
        element.Amount
      )
  );

  let accountMap = {};

  mappedOutput.forEach(function (transaction) {
    if (!accountMap.hasOwnProperty(transaction.from)) {
      accountMap[transaction.from] = new Account(transaction.from);
    }
    if (!accountMap.hasOwnProperty(transaction.to)) {
      accountMap[transaction.to] = new Account(transaction.to);
    }
    accountMap[transaction.from].balance -= parseFloat(transaction.amount);
    accountMap[transaction.to].balance += parseFloat(transaction.amount);
  });
  const userInput = readlineSync.prompt();
  logger.info(userInput);

  if (userInput === "List All") {
    console.log(accountMap);
  }
}

fs.readFile("Transactions2014.csv", (err, data) => {
  if (err) throw err;
  const file = data.toString();
  parse(
    file,
    { columns: true, skip_empty_lines: true, record_delimiter: "\n" },
    output
  );
});

class Account {
  constructor(name) {
    this.name = name;
    this.balance = 0;
  }
}

class Transaction {
  constructor(date, from, to, narrative, amount) {
    this.date = date;
    this.from = from;
    this.to = to;
    this.narrative = narrative;
    this.amount = amount;
  }
}
