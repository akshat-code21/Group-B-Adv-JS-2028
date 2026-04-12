const inventory = {
  Laptop: 5,
  Phone: 10,
  Headphones: 15,
  Monitor: 7,
  Keyboard: 12,
};

function processOrder(order) {
  // your code here
  return new Promise((res, rej) => {
    setTimeout(
      () => {
        for (let item of order) {
          if ((!item) in inventory || inventory[item] === 0) {
            rej("Not enough items in inventory for order to proceed");
          }
        }

        res("Order successful");
      },
      2000 * Math.random() + 1000,
    );
  });
}
