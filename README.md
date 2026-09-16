# Project during LIA2:

During the ferst part of my LIA2 i was taskt with creating a one page where user culd create a dockumet and send it to recipients to be signd or red. I programed front-end, back-end and som sql along with the scope to build the funtions arownd GetAccept's API exept for handeling of recipients with was savde and fetch from local DB.
...
**Funtional project requerierments:**

*Using GetAccepts API to fetch, send and handel the dockument.
*Login and fetch a tocken from GetAccept to autotherise user in other calls.
*Create and save new recipient in loclal db and fetch te information to be used.
*Fetch created templates from GetAccept, show the mto the user, being Abel to select one to use in creating dockument.
*Handeling upploading of dockument, send it to GetAccept and handeling respons of data.
*Keaping trac of data given feom user and send it in one request to GetAccept to send emails out to recipients with created dockument data.
...
**Technological Stack:**

*React + Vite.
*Nod.js + Express.
*Tailwind.
*Microsoft SQL Server.
*Upply for filhandeling.
*Axios for API calls.
*Winston for logging.
*Recharts for showing statistics.
*Dontev and cookies for handling of sensitive data.
...
##To Instal the project:
Clone the project.
  Git clone https://github.com/BeatriceOlsson/GetAcceptLIA2026
  Cd GetAcceptLIA2026
Configurate to local DB.
  1.Create a local db in MSSQL.
  2.Create a .env file in backend-rot and configurate your db with db information:
  ...
  DB_USER= your_user_name
  DB_PASSWORD= your_password
  DB_SERVER=localhost 
  DB_DATABASE= name-of-your_loclal_db

  Extern API-config
  API_URL= your_external_API_key
  ...
Start backend
  1.Open Terminal and go to the Backend file.
  ...
  Npm install
  Node server
  ...
Start frontend
  1.Open Terminal and go to Fronend file.
  ...
  Npm install
  Npm run dev
  ...
The application will now run on the localhhost with will be written in terminal.
