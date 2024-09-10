# Sofrware Challege Web Applocation

Descripition:  The App is about an application to manage the employees of a company. You can Add Skills, Employees and assign skills to employess.
This is the Back-end or api of the application.

## Tools Used

This project was created using Node.js Express.js Mongoose.js.
Authentication is being done with JWT tokens and bcrypt

## ENV

You will need a MongoDB database for this to connect and save Data. 
You also need to create a .env file and place you credentials in there. I have a dummy one which you will need to change.

## 
## How to Run:

Dont forget to install node-modules

### `npm install`

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode, with nodemon.

### `npm run start`

Runs the app.

##
## Usage

## Geneal
There are 4 data Types:

1. Skills
2. Employess
3. Admins
4. Releations between skills-employess

Admins are only used for authentication. 
Relations in pretty much a many-many array where an id for 1 employee and 1 skill is stored, indicating a relation between them.

## Middleware
There are middleware to:

1.Check authentication before continueing to a fetch request.
2. Hash authentication password before register/login.
3. Delete relations when an employee or skill is deleted.

### !Note:
You need to add your frontend Ip to to cors setup. This can be found in app.js 
```javascript
app.use(cors({
    origin: ['http://localhost:3000'], <-- Change/Add to this
    credentials: true 
}));
```


## Logging:
When you run a database.log file will be created in the directory of the project. This contains log information based on what actions are performed.
Its not complete and needs a log of refinement but, at the time, provides basic information.





