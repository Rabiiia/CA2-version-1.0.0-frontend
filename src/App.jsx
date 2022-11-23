import React, { useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Contact from "./pages/Contact.jsx";
import LandingPage from "./pages/LandingPage.jsx";

import List from "./components/CRUD/List";
import Create from "./components/CRUD/Create";
import Edit from "./components/CRUD/Edit";

import Header from "./components/Header.jsx";
import Jokes from "./components/Jokes.jsx";
import { useEffect } from "react";
import {
  getToken,
  verifyToken,
  decodeToken,
  removeToken,
  setToken,
} from "./utils/apiFacade";
import { DROPLET_URL } from "./utils/settings.js";

export const initialState = {
  username: null,
  roles: [],
  isLoggedIn: false,
};

export function updateUser(token, setUser) {
  const payload = decodeToken(token); //console.log(payload);
  setUser({
    username: payload["sub"],
    roles: payload["roles"],
    isLoggedIn: true,
  });
}

function App(props) {
  const [user, setUser] = useState(initialState);

  //denne function reruns everytime page is refreshed
  // bemærk denne function er async, fordi verifyToken function return a promise.
  // and async await unpacks that promise
  async function checkToken(token) {
    console.log("Checking token");
    if ((token = await verifyToken(token))) {
      setToken(token);
      updateUser(token, setUser);
    } else {
      console.log("Session expired");
      alert("Your session has expired. Please log in again.");
      removeToken();
    }
  }

  useEffect(() => {
    if (getToken()) {
      (async () => {
        await checkToken(getToken());
      })(); //< async anonymus function is being called right away ()
      setTimeout(async () => {
        await checkToken(getToken());
      }, 1000 * 60 * 30);
    }
  }, []);

  const obj = {
    name: "TestName",
    street: "TestStreet",
    town: "TestTown",
    country: "TestCountry",
  };

  return (
    <>
      <Header user={user} setUser={setUser} />
      <Routes>
        {!getToken() ? ( //<< hvis ingen token så landingpage ellers
          <>
            <Route path={DROPLET_URL} element={<LandingPage user={user} />} /> 
            
            {/* Add only Routes where you dont have to be logged ind to access */}
          </>
        ) : (
          //<< ellers ternary operator^

          <>
            {/* You have to be logged in as user or admin to see added routes down below  */}
            <Route path={DROPLET_URL} element={<Home user={user} />} />
            <Route path="/jokes" element={<Jokes />} />

            {/* You have to be logged in as  admin to see added routes down below  */}
            {
              user.roles.includes("admin") && (
                <>
                  <Route path="/crud" element={<List />} />
                  <Route path="/crud/create" element={<Create />} />
                  <Route path="/crud/edit/:id" element={<Edit />} />
                    {/* Add routes only admin can access */}
                </>
              )
             
            }
          </>
        )}

        {/* Does not matter if logged ind. You can always see these*/}
        
        <Route path={DROPLET_URL + "search"} element={<Search />} />
        <Route path="/contact" element={<Contact address={obj} />} />

        <Route path={DROPLET_URL + "*"} element={<h1>Page not found!</h1>} />
      </Routes>
    </>
  );
}

export default App;
