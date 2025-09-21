const express = require('express');
const path = require('path');
const session = require('express-session');

const authRoutes = require('./routes/auth');
const jobsRoutes = require('./routes/jobs');
const applicationsRoutes = require('./routes/applications');
const adminRoutes = require('./routes/admin');

const app = express();

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static and parsing
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Session (simple, not secure as per requirement)
app.use(
  session({
    secret: 'job-fair-secret', // in real apps use env
    resave: false,
    saveUninitialized: true
  })
);

// Expose user to views
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

// Routes
app.use('/', authRoutes);
app.use('/jobs', jobsRoutes);
app.use('/applications', applicationsRoutes);
app.use('/admin', adminRoutes);

// Home redirect to jobs
app.get('/', (req, res) => res.redirect('/jobs'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));