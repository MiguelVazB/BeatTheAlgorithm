// returns x random numbers between 1 and 100
function generateXRandomNumbers(quantity) {
  const randomNumbers = [];

  for (let i = 0; i < quantity; i++) {
    randomNumbers.push(Math.floor(Math.random() * 100) + 1);
  }
  return randomNumbers;
}

export { generateXRandomNumbers };
