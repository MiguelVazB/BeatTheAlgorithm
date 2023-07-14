// returns x random numbers between 1 and 100
function generateXRandomNumbers(quantity) {
  const randomNumbers = [];

  for (let i = 0; i < quantity; i++) {
    randomNumbers.push(Math.floor(Math.random() * 100) + 1);
  }

  for (let i = randomNumbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomNumbers[i], randomNumbers[j]] = [randomNumbers[j], randomNumbers[i]];
  }

  return randomNumbers;
}

function generateXUniqueRandomNumbers(quantity) {
  const randomNumbers = [];

  while (randomNumbers.length < quantity) {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber);
    }
  }

  for (let i = randomNumbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomNumbers[i], randomNumbers[j]] = [randomNumbers[j], randomNumbers[i]];
  }

  return randomNumbers;
}

export { generateXRandomNumbers, generateXUniqueRandomNumbers };
