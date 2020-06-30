const fs = require("fs");
const parse = require("csv-parse/lib/es5");

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
      accountMap[transaction.from] = 0;
    }
    if (!accountMap.hasOwnProperty(transaction.to)) {
      accountMap[transaction.to] = 0;
    }
    if (
      accountMap.hasOwnProperty(transaction.from) ||
      accountMap.hasOwnProperty(transaction.to)
    ) {
      accountMap[transaction.from] =
        accountMap[transaction.from] - parseFloat(transaction.amount);
      accountMap[transaction.to] =
        accountMap[transaction.to] + parseFloat(transaction.amount);
    }
  });
  console.log(accountMap);
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
