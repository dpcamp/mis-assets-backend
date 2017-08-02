require('dotenv').config();

    const express       = require('express'),
    app                 = express(),

    port                = process.env.PORT || 3000,
    expressLayouts      = require('express-ejs-layouts'),
    bodyParser          = require('body-parser'),
    cors                = require('cors'),
    expressValidator    = require('express-validator'),
    session             = require('express-session'),
    cookieParser        = require('cookie-parser'),
    flash               = require('connect-flash')
    //sql                 = require('mssql')

    //Sequelize           = require('sequelize')
    ;

//express
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);   


//session and cookie
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    cookie: {maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));

//connect-flash for displaying messages accross pages
app.use(flash());


/*database

sql.connect(process.env.DB_URI, (err) => { 
    if (err) {
        console.log(`Could not connect to DB: ${err}`);
    }
});
*/

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(expressValidator());

//API Routes
app.use('/api/users', require('./api/routes/users'));
app.use('/api/phones', require('./api/routes/phones'));

//Client Routes
//app.use('/', require('./app/routes'));

app.listen(port, () => {

    console.log(`Server is running at http://localhost:${port}`);
});
