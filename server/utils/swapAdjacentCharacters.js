const getRandomProperty = require('./getRandomProperty');

const swapAdjacentCharacters = (user, region, counters) => {
    const randomProperty = getRandomProperty(user);
    const originalValue = user[randomProperty];
    const index = Math.floor(Math.random() * (originalValue.length - 1));
    const modifiedValue =
        originalValue.slice(0, index) +
        originalValue.charAt(index + 1) +
        originalValue.charAt(index) +
        originalValue.slice(index + 2);
    return { ...user, [randomProperty]: modifiedValue };
};

module.exports = swapAdjacentCharacters;
