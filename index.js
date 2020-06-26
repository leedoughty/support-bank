const fs = require("fs");
const parse = require("csv-parse/lib/es5");

function output(err, output) {
  if (err) throw err;
  console.log(output);
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
