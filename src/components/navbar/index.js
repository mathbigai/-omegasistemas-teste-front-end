
import React from 'react';
import { FaVirusCovid } from "react-icons/fa6";
import './style.scss';


const NavBar = () => {

    return (
        <div className='container-navbar'>
            <FaVirusCovid/>
            <h1>Relatório COVID-19</h1>
        </div>
    );
};

export default NavBar;