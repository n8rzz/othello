/**
 * * GET /
 *
 * Home view
 */
const index = function index(req, res) {
    res.render('home');
}

/**
 * * GET /login
 *
 * Login view
 */
const login = function login(req, res) {
    res.render('account/login');
}

/**
 * * GET /logout
 *
 * destroy the current session and redirect to `/login` view
 */
const logout = function logout(req, res) {
    if (!req.session.username || !req.session.userToken) {
        return;
    }

    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
            return;
        }

        res.redirect('/login');
    });
}

/**
 * * GET /lobby
 *
 * Lobby view
 *
 * Only available for users with credentials
 */
const lobby = function lobby(req, res) {
    res.render('lobby/lobby');
}

module.exports = {
    index: index,
    login: login,
    logout: logout,
    lobby: lobby,
};
