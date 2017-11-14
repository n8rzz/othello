/** * GET /
 *
 * Home page
 */
const index = function index(req, res) {
    res.render('home', {
        title: 'Home',
    });
}

module.exports = {
    index: index,
};
