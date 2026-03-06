// BankAccount -
// deposit , withdraw , getBalance , transfer

class BankAccount {
  constructor(balance) {
    let _balance = balance; // private

    function calculateAmount() {
        return _balance // private method
    }

    this.depoist = function (amount) {
      _balance += amount;
    };

    this.withdraw = function (amount) {
      _balance -= amount;
    };

    this.showBalance = function () {
        console.log('Balance',  _balance)
    };
  }

  calculateData() {
    console.log(this.showBalance());
  }
}

let acc = new BankAccount(10000);

console.log(acc._balance);


// how we used to do it before 2022 using closures for private methods.

// we move all private methods to the constructor.