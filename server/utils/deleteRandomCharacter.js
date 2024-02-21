const getRandomProperty = require('./getRandomProperty');
const constants = require('../constants/const');

const deleteRandomCharacter = (user) => {
    const randomProperty = getRandomProperty(user);

    const originalValue = user[randomProperty];
    if (originalValue.length > 6) {
        {
            const index = Math.floor(Math.random() * originalValue.length);
            const modifiedValue =
                originalValue.slice(0, index) + originalValue.slice(index + 1);
            return { ...user, [randomProperty]: modifiedValue };
        }
    } else {
        return user;
    }
};

module.exports = deleteRandomCharacter;
