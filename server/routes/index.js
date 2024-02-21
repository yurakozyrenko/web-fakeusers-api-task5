const fakeData = require('../utils/generateFakeData.js');
const constants = require('../constants/const.js');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const express = require('express');
const router = express.Router();

let currentSeed = constants.CURRENTSEEDSTART;
let generateDataExecuted = false;

router.get('/generateData', async (req, res) => {
    try {
        const { region = 'ru', errorCount = 0, seed = currentSeed } = req.query;

        generateDataExecuted = true;

        const data = await fakeData(
            region,
            errorCount,
            seed,
            constants.START_PAGE_USERS
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/generateNextData', async (req, res) => {
    try {
        const { region = 'ru', errorCount = 0, seed } = req.query;

        if (generateDataExecuted) {
            currentSeed = seed;
            generateDataExecuted = false; // Сбрасываем флаг после обнуления
        }
        currentSeed++;

        const data = await fakeData(
            region,
            errorCount,
            currentSeed,
            constants.ADD_PAGE_USERS
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//CSV
router.post('/exportToCsv', (req, res) => {
    const csvWriter = createCsvWriter({
        path: 'exportedData.csv', // Имя файла
        header: [
            { id: 'userId', title: 'User ID' },
            { id: 'name', title: 'Name' },
            { id: 'address', title: 'Address' },
            { id: 'phone', title: 'Phone' },
        ],
        encoding: 'utf8',
    });
    const data = req.body;
    csvWriter
        .writeRecords(data)
        .then(() => {
            // Отправляем файл пользователю
            res.download('exportedData.csv', 'exportedData.csv', (err) => {
                // Удаляем файл после отправки
                if (!err) {
                    fs.unlinkSync('exportedData.csv');
                }
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

module.exports = router;
