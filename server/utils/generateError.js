const applyError = (errorFunction, user, region) => errorFunction(user, region);
const insertRandomCharacter = require('./insertRandomCharacter');
const deleteRandomCharacter = require('./deleteRandomCharacter');
const swapAdjacentCharacters = require('./swapAdjacentCharacters');

const introduceRandomError = (user, errorCount, region) => {
    let modifiedUser = { ...user };

    const errorCountPart = Math.floor(errorCount);
    const errorCountfractionalPart = errorCount % 1;

    if (errorCountfractionalPart) {
        const randomValue = Math.random();

        if (randomValue > errorCount) {
            return modifiedUser;
        }

        const random = Math.random();

        switch (true) {
            case random < 1 / 3:
                modifiedUser = applyError(deleteRandomCharacter, modifiedUser);
                break;
            case random < 2 / 3:
                modifiedUser = applyError(
                    insertRandomCharacter,
                    modifiedUser,
                    region
                );
                break;
            default:
                modifiedUser = applyError(swapAdjacentCharacters, modifiedUser);
        }
    }

    for (let i = 0; i < errorCountPart; i++) {
        const random = Math.random();

        switch (true) {
            case random < 1 / 3:
                modifiedUser = applyError(deleteRandomCharacter, modifiedUser);
                break;
            case random < 2 / 3:
                modifiedUser = applyError(
                    insertRandomCharacter,
                    modifiedUser,
                    region
                );
                break;
            default:
                modifiedUser = applyError(swapAdjacentCharacters, modifiedUser);
        }
    }

    return modifiedUser;
};

module.exports = introduceRandomError;
