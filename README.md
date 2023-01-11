# AGENT BANK

![Agent Bank logo](/frontend/agentbank/src/assets/img/argentBankLogo.png)

## 1. General information

P13: Use an API for a bank user account with React

---

## 2. Project launching

### 2.1 Prerequisites

- [NodeJS (**V12**)](https://nodejs.org/en/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)

Please make sure you have the right versions and download both packages. You can verify this by using the following commands in your terminal:

```bash
# Check Node.js version
node --version

# Check Mongo version
mongo --version
```

### 2.2 Installation

- Fork the repository
- Clone it on your computer.

### 2.3 Launching the Back-End

- Move to the back-end directory
  ```sh
  cd ./backend
  ```
- Initialize the back-end project & dependencies
  ```sh
  npm i
  ```
- Run the project (port 3001 by default)

  ```sh
  npm run dev:server
  ```

  #### Populated Database Data

  Once you run the `populate-db` script, you should have two users in your database:

  ##### Tony Stark

  - First Name: `Tony`
  - Last Name: `Stark`
  - Email: `tony@stark.com`
  - Password: `password123`

  ##### Steve Rogers

  - First Name: `Steve`,
  - Last Name: `Rogers`,
  - Email: `steve@rogers.com`,
  - Password: `password456`

  #### API Documentation

  To learn more about how the API works, once you have started your local environment, you can visit: http://localhost:3001/api-docs

### 2.4 Launching the Front-End

- Move to the front-end directory
  ```sh
  cd ./frontend/agentbank
  ```
- Initialize the front-end project & dependencies
  ```sh
  npm i
  ```
- Run the project
  ```sh
  npm run dev
  ```
- Open the project
  ```sh
  o
  ```

---
