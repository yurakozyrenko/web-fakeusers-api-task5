const getRandomProperty = require('./getRandomProperty');
const getRandomCharacter = require('./getRandomCharacter');
const constants = require('../constants/const');

const insertRandomCharacter = (user, region) => {
    const randomProperty = getRandomProperty(user);

    const originalValue = user[randomProperty];
    if (originalValue.length < constants.MAX_LENGTH_COLOMN) {
        const index = Math.floor(Math.random() * originalValue.length);
        const randomCharacter = getRandomCharacter(region);

        const modifiedValue =
            originalValue.slice(0, index) +
            randomCharacter +
            originalValue.slice(index);
        return { ...user, [randomProperty]: modifiedValue };
    } else {
        return user;
    }
};

module.exports = insertRandomCharacter;
