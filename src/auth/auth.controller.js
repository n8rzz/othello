const handleGoogleCallback = function handleGoogleCallback(req, res) {
    console.log(req.query)

    res.end(JSON.stringify(req.query, null, 2))
};

const handleTwitterCallback = function handleTwitterCallback(req, res) {
    console.log(req.query)

    res.end(JSON.stringify(req.query, null, 2))
};

module.exports = {
    handleGoogleCallback: handleGoogleCallback,
    handleTwitterCallback: handleTwitterCallback,
};
