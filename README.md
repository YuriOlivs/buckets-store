
# 🏀 BUCKETS Store API

This RESTful API was developed in NestJS following a modularized monolith architecture to simulate an NBA/basketball merchandise store. The project was created with a focus on **back-end** studies, best practices in architecture, and code organization.



## 💻 Stack

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker-Compose-blue?style=for-the-badge&logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)




## 💼 Business Features

- User registration and management
- Product registration, management, and filtering
- Shopping cart
- Applying discount coupons
- Order simulation
- Inventory management
- Team registration and management
## ⌨️ Technical Features 

- Authentication with **JWT**
- Route protection with **Guards**
- Data validation with **class-validator**
- Data persistence with **PostgreSQL** + **TypeORM**
- Modular architecture with **NestJS**
- Environment execution via **Docker Compose**

## ⚙️ Enviroment Configuration

For the project to function correctly, it is necessary to have a properly configured PostgreSQL database along with the environment variables defined in its `.env` file.

Example:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=buckets_store

```



## 🐳 Running the project with Docker

Prerequisites
- Docker
- Docker Compose

Steps to run the project

1) Clone the repository
```git clone https://github.com/YuriOlivs/buckets-store.git```

2) Access the project folder
```cd buckets-store```

3) Start the containers
```docker-compose up -d```

4) Project setup
```
npm install
```

5) Compile and run the project
```
npm run start

npm run start:dev
```
## 🧑‍💻 Developer

Developed by [@YuriOlivs](https://www.github.com/YuriOlivs) - Project created for study and portfolio purpouses.

