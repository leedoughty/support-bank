const fs = require("fs");
const moment = require("moment");

fs.readFile("Transactions2014.csv", (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});

class Account {
  constructor(name, balance = 0) {
    this.name = name;
    this.balance = balance;
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
