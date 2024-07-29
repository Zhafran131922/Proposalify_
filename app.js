const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");  // Change this line
const multer = require('multer');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Middleware for authentication
const authenticateUser = (req, res, next) => {
    req.user = {
        role: 'administrator' // Example role for testing
    };
    next();
};
app.use(authenticateUser);

// Passport Google OAuth configuration
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"],
        },
        (accessToken, refreshToken, profile, callback) => {
            callback(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Use express-session instead of cookie-session
app.use(
    session({
        secret: "cyberwolve",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false } // set secure to true if using https
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

// Routes
const authRoutes = require('./routes/authRoutes');
const proposalRoutes = require('./routes/proposalRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const googleRoutes = require('./routes/googleRoutes');
const reviewProposalRoutes = require('./routes/reviewProposalRoutes');
const historyRoutes = require('./routes/historyRoutes');
const proposalController = require('./controllers/proposalController');
const authController = require('./controllers/authController');

app.use('/api/auth', authRoutes);
app.use('/auth', googleRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/users', userRoutes);
app.post('/api/admin/register-dosen', authController.registerDosen);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/review-proposal', reviewRoutes);
app.use('/api/review-proposal', reviewProposalRoutes);
app.use('/api/history', historyRoutes);
app.post('/api/send-proposal', proposalController.sendProposalHandler);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
