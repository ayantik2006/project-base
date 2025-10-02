# How to run the Project in your local machine?
## - Ayantik Sarkar 
---
## Prerequisites
- [Download NodeJS](https://nodejs.org/en/download) on your PC
- Check whether it is installed properly by running the below code in the terminal
  ```bash
     node --version
  ```
  It should show the version of node installed
-  [Download MongoDB](https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-8.2.0-signed.msi) on your PC
-  Check whether it is installed properly by running the below code in the terminal
   ```bash
     mongosh --version
   ```
   It should show the version of mongoDB installed

## Steps
  1. ⬇️Download the zip folder of the project as show in the image below and extract the files to create a project of your own.
     <img width="1353" height="559" alt="image" src="https://github.com/user-attachments/assets/89fcf572-0ff6-4f7f-8f27-df3bdd03afb5" />
     <br>
     
  2. ⚙️Create a .env file in the backend folder with the below variables- <br>
        PORT=8080, SECRET_KEY, MONGO_URI, SENDGRID_API_KEY, SENDER_EMAIL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
     > **Important:** For now ignore GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET and include the rest, for SENDER_EMAIL use your own email for now, for SENDGRID_API_KEY create an API key in SendGrid email service(follow a tutorial on how to do it), create your own SECRET_KEY(any password type stuff), for MONGO_URI value will be the MongoDB server URL(watch a tutorial regarding it). Also watch a tutorial regarding .env file creation
     
     
  4. 🚨Replace the variable 'frontendURL' with value "http://localhost:5173" wherever it exists in the project (requires hardwork, not going for 30%)
    
  6. 🚨Replace the variable 'backendURL' with value "http://localhost:8080" wherever it exists in the project  (requires hardwork, not going for 30%)

  7. 🚨In ./backend/controllers/auth.js, in the function 'signin' below should be the code for 'res.cookie' for running on local machine-     
    <img width="734" height="189" alt="image" src="https://github.com/user-attachments/assets/c8e6ef86-6073-4703-926d-70cf999f68ab" />
    <br>
    Follow the comments while deploying
    <br>
    
  8. 🚨In .backend/index.js, comment out the below code for running on local machine-
     <img width="1256" height="311" alt="image" src="https://github.com/user-attachments/assets/5ca32a98-9d02-481f-9467-fe02435fc7ee" />
     <br>
     Include it while deploying
     <br>

   9. In the main project folder directory, run the below commands in the terminal-
      ```bash
      cd frontend
      ```
      ```bash
      npm install
      ```
      ```bash
      cd..
      ```
      ```bash
      cd backend
      ```
      ```bash
      npm install
      ```
      ```bash
      cd..
      ```
            
  10. Final step, run the below commands in the terminal from the main project directory #not going for 30%
      ```bash
      cd frontend
      npm run dev
      cd..
      ```
      Above commands starts the frontend vite server on port number 5173
      ```bash
      cd backend
      node index.js
      cd..
      ```
      Above commands starts the backend server on port number 8080
      
   12. Go to the link http://localhost:5173 to view the project on your browser
