function ms(i, x) {
  x = i + x;
  return x;
}

const nested = function (i) {
  return i * 200;
};

console.log(ms(nested(1), 5));
