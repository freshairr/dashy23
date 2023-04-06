require('dotenv').config({ path: 'server/config/' + '.env', debug: true });
const express = require('express');
const app = express();
const connectDB = require('./config/database');
const passport = require('passport');
const session = require('express-session');
const homeRoutes = require('./routes/home');
const todoRoutes = require('./routes/todos');
const jwt = require('jsonwebtoken');
const UserLocal = require('./models/UserLocal');
const cookieParser = require('cookie-parser');
const JWTAuth = require('./middleware/JWTAuth');
//returns a class used to store sessions in mongoDB
//pass in an instance of express-session (session)
const MongoDBStore = require('connect-mongodb-session')(session);
const path = require('path');

connectDB();

//configure Express
app.use(express.static('public'));
// app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// All other GET requests not handled before will return our React app
/* app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
}); */

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

// Enables CORS
const cors = require('cors');
app.use(cors({ origin: true }));

//session middleware
app.use(
	session({
		secret: 'keyboard cat',
		cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 1000ms(1sec)*60sec*60min*24hrs*7days = 1 week
		store: new MongoDBStore({ uri: process.env.DB_STRING }),
		resave: false,
		saveUninitialized: false,
	})
);

//cookie for JWT
app.use(cookieParser());

// Passport config
require('./config/passport')(passport);

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use('/', homeRoutes);
app.use('/todos', todoRoutes);

app.get('/express_backend', (req, res) => {
	res.json({ express: 'backend connected to react!' });
});

app.get('/api/home', (req, res) => {
	res.send(
		'welcome to the home api route! Please login to access the dashboard'
	);
});

app.get('/api/secret', JWTAuth, (req, res) => {
	res.send('JWT verified. the secret password is potato');
});

app.post('/api/register', (req, res) => {
	const { email, password } = req.body;
	const user = new UserLocal({ email, password });
	user.save(function (err) {
		if (err) {
			res.status(500).send(
				'error registering new user. please try again'
			);
		} else {
			res.status(200).send('registration succesful. welcome');
		}
	});
});

const secret = 'mysecret';
app.post('/api/authenticate', (req, res) => {
	const { email, password } = req.body;
	UserLocal.findOne({ email }, (err, user) => {
		if (err) {
			console.error(err);
			res.status(500).json({ error: 'internal server error. try again' });
		} else if (!user) {
			res.status(401).json({ error: 'incorrect email or password' });
		} else {
			user.isCorrectPassword(password, (err, same) => {
				if (err) {
					res.status(500).json({
						error: 'internal error. please try again',
					});
				} else if (!same) {
					res.status(400).json({
						error: 'incorrect email or password',
					});
				} else {
					const payload = { email };
					const token = jwt.sign(payload, secret, {
						expiresIn: '1h',
					});
					res.cookie('token', token, { httpOnly: true }).sendStatus(
						200
					);
				}
			});
		}
	});
});

app.get('/checkToken', JWTAuth, (req, res) => {
	res.sendStatus(200);
});

app.listen(process.env.PORT, () => {
	console.log('Server is running on port', process.env.PORT);
});
