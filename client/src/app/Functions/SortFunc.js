export const priceLowToHigh = (products) => {
  products.sort((a, b) => {
    return a.prodPrice - b.prodPrice;
  });
  //console.log("Product : ", products);
  return products;
};

export const priceHighToLow = (products) => {
  //console.log("___High to Low___");
};

export const RatingLowToHigh = (products) => {
  //console.log("Low Rating___");
};

export const RatingHighToLow = (products) => {
  //console.log("___High Rating___");
};

export const newArrivals = (products) => {
  //console.log("___High Rating___");
};
