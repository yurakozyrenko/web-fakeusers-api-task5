import React, { useState, useEffect } from 'react';
import Controls from './Controls';
import DisplayData from './DisplayData';

function App() {
    const [region, setRegion] = useState('ru');
    const [errorCount, setErrorCount] = useState(0);
    const [seed, setSeed] = useState('1');
    const [data, setData] = useState([]);

    const updateErrorCount = (value) => {
        setErrorCount(value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_SERVERURL}/api/generateData?region=${region}&errorCount=${errorCount}&seed=${seed}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                const json = await response.json();
                setData(json);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [region, errorCount, seed]);

    const handleScroll = async (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

        if (scrollTop + clientHeight >= scrollHeight - 10) {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_SERVERURL}/api/generateNextData?region=${region}&errorCount=${errorCount}&seed=${seed}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                const newData = await response.json();
                setData((prevData) => [...prevData, ...newData]);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const exportToCsv = async () => {
        try {
            const response = await fetch(
                `http://api/localhost:4000/exportToCsv`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            );

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'exportedData.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                console.error('Failed to export data to CSV');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSeedChange = (value) => {
        setSeed(value);
        const newRandomValue = generateRandomValueBasedOnSeed(value);
        setSeed(newRandomValue);
    };

    const generateRandomValueBasedOnSeed = (seed) => {
        seed = (seed * 16807) % 2147483647;
        return seed;
    };

    return (
        <div
            className="App"
            onScroll={handleScroll}
            style={{ maxHeight: '800px', overflowY: 'auto' }}
        >
            <Controls
                region={region}
                setRegion={setRegion}
                errorCount={errorCount}
                updateErrorCount={updateErrorCount}
                seed={seed}
                setSeed={setSeed}
                handleSeedChange={handleSeedChange}
                exportToCsv={exportToCsv}
            />
            <DisplayData data={data} />
        </div>
    );
}

export default App;
