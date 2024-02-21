import React from 'react';

function DisplayData({ data }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Номер</th>
                    <th>Случайный идентификатор</th>
                    <th>ФИО</th>
                    <th>Адрес</th>
                    <th>Телефон</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.userId}</td>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        <td>{item.phone}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default DisplayData;
