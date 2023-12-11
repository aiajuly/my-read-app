const User = require('../models/user');




module.exports = {

    newUserForm: (req, res) => {
        res.render('users/register', {title: 'Register'})
    },

    createAndLogInUser: async(req, res) => {
        try {
            const { email, username, password } = req.body;
            const user = new User({ email, username });
            const registeredUser = await User.register(user, password);
            req.login(registeredUser, err => {
                if (err) return next(err);
                req.flash('success', 'Welcome to MyRead');
                res.redirect('/books');
            })
        } catch (e) {
            req.flash('error', e.message);
            res.redirect('/register');
        }
    },

    loginForm: (req, res) => {
        res.render('users/login', {title: "Log In"})
    },

    login: (req, res) => {
        req.flash('success', 'welcome back!');
        res.redirect('/books');
    },

    logout: (req, res, next) => {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            req.flash('success', 'Goodbye!');
            res.redirect('/login');
        });
    }
}




