import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import Login from "./Login.jsx";
import LoggedIn from "./LoggedIn.jsx";
import "../styles/header.css";
import { getToken } from '../utils/apiFacade.js';

//mother of loggedIn and Login

function Header({setErrorMsg, user, setUser}) {


    return (
      
        <nav className="topnav">

            {/* 'All can these two in navbar' */}
            <NavLink className="active" to="/"><i className="fa fa-fw fa-home"></i> Home</NavLink>
            <NavLink to="/search"><i className="fa fa-fw fa-search"></i> Search</NavLink>
            
            
            {user.roles.includes("user") ? 
            <NavLink to="/jokes"><i></i> Jokes</NavLink> : null }

            {user.roles.includes("admin") ? 
                <NavLink to="/crud"><i/> CRUD </NavLink> : null}

            {!getToken() ? //hvis man ikke er logget ind, så skal den i login komponent ellers ned i LoggedIn
                <Login setUser={setUser} setErrorMsg={setErrorMsg}/> :
                <LoggedIn user={user} setUser={setUser}/>
            }
        </nav>

    );
}

export default Header;
