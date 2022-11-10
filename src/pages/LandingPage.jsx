import React from 'react'

function LandingPage() {
  return (<>
        <h1>Landing Page</h1>
        <h1>For you to see me you have to first in visual studio code og webstorm: </h1>
         <h2>npm install</h2>
         <h2>npm run dev</h2>
         <br></br>
         <h3>Some Info: </h3>
         <h3>Admin and User can log in with a default code</h3>
         <h3>In order to deploy front end to droplet</h3>
         <ul>
          <li>create deploy.sh file</li>
          <li>chmod -R 747 XXX. replace XXX with directory name - so that we can give rightt to the folder </li>
          <li>edit your setting.js to your droplet tomcat server</li>
         </ul>
         </>
  )
   
}

export default LandingPage