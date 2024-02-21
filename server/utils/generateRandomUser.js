const introduceRandomError = require('./generateError');

const createRandomUser = (currentFaker, errorCount, region) => {
    const fullAddress = `${currentFaker.location.city()}, ${currentFaker.location.streetAddress()}, ${currentFaker.location.secondaryAddress()}`;

    user = {
        name: currentFaker.person.fullName(),
        address: fullAddress,
        phone: currentFaker.phone.number(),
    };
    if (errorCount) {
        user = introduceRandomError(user, errorCount, region);
    }

    user.userId = currentFaker.string.uuid();
    return user;
};

module.exports = createRandomUser;
