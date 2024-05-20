import React, { useEffect, useState } from 'react';
import { GiBrazilFlag, GiDeathSkull } from "react-icons/gi";
import { FaVirusCovid } from "react-icons/fa6";
import './style.scss';
import { Table } from 'react-bootstrap';


const Statistic = () => {
    const [covidData, setCovidData] = useState([]);


    //USEEFECT TO ADD ALL INFOS TO COVID 19 API
    useEffect(() => {
        fetch('https://covid19-brazil-api.vercel.app/api/report/v1')
            .then(response => response.json())
            .then(data => {
                const updatedData = data.data.map(state => ({
                    ...state,
                }));
                setCovidData(updatedData);
                console.log(covidData)
            });
    }, []);

    return (
        <div className='container-statistic'>
            <h1>Estatísticas</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th><GiBrazilFlag />Estados</th>
                        <th><FaVirusCovid />Casos</th>
                        <th><GiDeathSkull />Mortes</th>
                    </tr>
                </thead>
                <tbody>

                    {covidData.map(state => ( //ADD INFOS IN TABLE
                        <tr>
                            <td>{state.state}</td>
                            <td>{state.cases}</td>
                            <td>{state.deaths}</td>
                        </tr>
                    ))
                    }

                </tbody>
            </Table>
        </div>
    );
};

export default Statistic;