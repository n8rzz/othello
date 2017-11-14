const request = require('request-promise');
const purest = require('purest')({request});
const config = require('@purest/providers');
const twitter = purest({
    provider: 'twitter',
    key: process.env.TWITTER_OAUTH_KEY,
    secret:process.env.TWITTER_OAUTH_SECRET,
    config
});

const handleGoogleCallback = function handleGoogleCallback(req, res) {
    const userProfile = googleTokenToProfile(req.query);

    res.end(JSON.stringify(req.query, null, 2));
};

const handleTwitterCallback = function handleTwitterCallback(req, res) {
    const userProfile = twitterTokenToProfile(req.query);

    res.end(JSON.stringify(req.query, null, 2));
};

// {
//     "access_token": string,
//     "access_secret": string,
//     "raw": {
//         "oauth_token": string,
//         "oauth_token_secret": string,
//         "user_id": number,
//         "screen_name": string,
//         "x_auth_expires": string
//     }
// }
function twitterTokenToProfile(oauthSuccessResponse) {
    const req = twitter.query()
        .select('users/show')
        .where({
            user_id: oauthSuccessResponse.raw.user_id
        })
        .auth(oauthSuccessResponse.access_token, oauthSuccessResponse.access_secret)
        .request(function(err, res, body) {
            console.log(':::', body);
        });
}

// {
//     "access_token": string,
//     "raw": {
//         "access_token": string
//         "expires_in": string
//         "id_token": string
//         "token_type": string
//     }
// }
function googleTokenToProfile(oauthSuccessResponse) {
    const verifyToken = _verifyGoogleToken(oauthSuccessResponse);

    verifyToken.then((tokenResponse) => _verifyTokenResponseHandler(tokenResponse, oauthSuccessResponse.access_token))
        .catch((error) => { throw error; });
}

function _verifyTokenResponseHandler(tokenResponse, accessToken) {
    const userInfo = _requestGoogleUserInfo(accessToken);

    return userInfo.then((userInfoResponse) => {
            // TODO: do stuff with the user profile info
        })
        .catch((error) => { throw error; });
}

function _verifyGoogleToken(oauthSuccessResponse) {
    return request(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${oauthSuccessResponse.raw.id_token}`);
}

function _requestGoogleUserInfo(accessToken) {
    return request(`https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${accessToken}`);
}


module.exports = {
    handleGoogleCallback: handleGoogleCallback,
    handleTwitterCallback: handleTwitterCallback,
};


