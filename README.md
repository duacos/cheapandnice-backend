## General design

![](files/diagram.png)

#### This project is hosted at http://cheapandnice.herokuapp.com

## Main libraries

- [JWT](https://github.com/auth0/node-jsonwebtoken)
- [Express](https://github.com/expressjs/express)
- [Cookie-parser](https://github.com/expressjs/cookie-parser)

## Technologies

- JWT
- Nodejs + express
- Mongo Atlas

### Accounts

You can either create a new account or use

username: condorlabs

password: 123456

## How to run this project locally

To run the project locally, you need to fonfigure the enviroment variables

| Key          | Value                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------- |
| DATABASE_URL | mongodb+srv://duacos:hospitality@clustertest-grdcx.mongodb.net/cheapandnice?retryWrites=true&w=majority |
| PORT         | Any port is ok                                                                                          |
| JWT_SECRET   | "secret key"                                                                                            |
| ORIGIN       | http://localhost:PORT                                                                                   |
| DOMAIN       | localhost                                                                                               |

Your ORIGIN should point the frontend version of the project (Note that it has it's own configuration, [README](https://github.com/duacos/cheapandnice-frontend/blob/master/README.md)

Frontend: https://github.com/duacos/cheapandnice-frontend
