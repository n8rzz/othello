/**
 * * GET /
 *
 * Home view
 */
const index = function index(req, res) {
    res.render('home', {
        title: 'Home',
    });
}

/**
 * * GET /login
 *
 * Login view
 */
const login = function login(req, res) {
    res.render('account/login', {
        title: 'Login',
    });
}

module.exports = {
    index: index,
    login: login,
};
