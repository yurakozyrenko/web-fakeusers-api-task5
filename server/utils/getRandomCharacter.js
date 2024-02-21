// Функция для получения случайного символа из алфавита (можно адаптировать под конкретный регион)

const getRandomCharacter = (region) => {
    const alphabets = {
        ru: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789',
        pl: 'aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźżAĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ0123456789',
        fr: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎÇÙÛÜŸÆŒ0123456789',
    };

    const alphabet = alphabets[region] || alphabets['ru'];
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet.charAt(randomIndex);
};

module.exports = getRandomCharacter;
