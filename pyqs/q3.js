function applyDiscount(price) {
  // your code here
  return function fn(discount) {
    if (discount === undefined) {
      return price;
    }

    const discountedPrice = price - (price * discount) / 100;

    return applyDiscount(discountedPrice);
  };
}

console.log(applyDiscount(100)(10)(20)(30)());