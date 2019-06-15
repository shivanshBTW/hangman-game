function randGen(x) {
  return Math.floor(Math.random() * x);
}

function randArr(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export { randGen, randArr };
