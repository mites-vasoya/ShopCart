const calculateDiscFunc = (price, mrp) => {
  return Math.floor(((mrp - price) * 100) / mrp);
};

export default calculateDiscFunc 