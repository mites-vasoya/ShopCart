import discountCalcFunc from "../../app/Functions/discountCalcFunc";

export const ratingFilter = (ratingValue, prodArray) => {
  let filteredArray = [];
  prodArray.map((product) => {
    if (product.rating >= ratingValue) {
      filteredArray.push(product);
    }
  });
  return filteredArray;
};

export const priceFilter = (lower, upper, prodArray) => {
  let filteredArray = [];
  prodArray.map((product) => {
    if (product.prodPrice > lower && product.prodPrice < upper) {
      filteredArray.push(product);
    }
  });
  return filteredArray;
};

export const PodFilter = (prodArray) => {
  let filteredArray = [];
  prodArray.map((product) => {
    let paymentType = product.paymentType;
    if (paymentType?.includes("COD")) {
      filteredArray.push(product);
    }
  });
  return filteredArray;
};

export const discountFilter = (discount, prodArray) => {
  let filteredArray = [];
  prodArray.map((product) => {
    const CalcDiscount = discountCalcFunc(product.prodPrice, product.prodMRP);
    if (Number(CalcDiscount) >= Number(discount)) {
      filteredArray.push(product);
    }
  });
  return filteredArray;
};
