const { fr, pl, ru, Faker } = require('@faker-js/faker');
const createRandomUser = require('./generateRandomUser');
const constants = require('../constants/const');

const customFakers = {
    pl: new Faker({ locale: [pl] }),
    ru: new Faker({ locale: [ru] }),
    fr: new Faker({ locale: [fr] }),
};

const fakeData = (region, errorCount, seed, k) => {
    const currentFaker = customFakers[region];

    currentFaker.seed(+seed);

    if (!currentFaker) {
        throw new Error(`${constants.UNSP_REGION} ${region}`);
    }

    const users = currentFaker.helpers.multiple(
        () => createRandomUser(currentFaker, errorCount, region),
        {
            count: k,
        }
    );

    return users;
};

module.exports = fakeData;
