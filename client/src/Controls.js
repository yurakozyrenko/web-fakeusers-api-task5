import React from 'react';

function Controls({
    region,
    setRegion,
    errorCount,
    updateErrorCount,
    seed,
    setSeed,
    handleSeedChange,
    exportToCsv,
}) {
    return (
        <div id="controls">
            <label htmlFor="region">Выберите регион:</label>
            <select
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
            >
                <option value="ru">Россия (русский)</option>
                <option value="pl">Польша (польский)</option>
                <option value="fr">Франция (французкий)</option>
            </select>

            <label htmlFor="error-slider">Количество ошибок на запись:</label>
            <input
                type="range"
                id="error-slider"
                min="0"
                max="10"
                step="0.5" // Шаг изменения
                value={errorCount}
                onChange={(e) => updateErrorCount(e.target.value)}
            />
            <input
                type="number"
                id="error-input"
                min="0"
                max="1000"
                value={errorCount}
                onChange={(e) => updateErrorCount(e.target.value)}
            />

            <label htmlFor="seed">Seed:</label>
            <input
                type="text"
                id="seed"
                placeholder="1"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
            />
            {
                <button onClick={() => handleSeedChange(seed)}>
                    Сгенерировать
                </button>
            }
            <button onClick={exportToCsv}>Export to CSV</button>
        </div>
    );
}

export default Controls;
