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
    lobby: lobby,
};
