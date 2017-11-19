const request = require('request-promise');
const purest = require('purest')({request});
const config = require('@purest/providers');
const twitter = purest({
    provider: 'twitter',
    key: process.env.TWITTER_OAUTH_KEY,
    secret:process.env.TWITTER_OAUTH_SECRET,
    config
});

const PROVIDER = {
    GITHUB: 'github',
    GOOGLE: 'google',
    TWITTER: 'twitter'
};

const githubCallbackHandler = function githubCallbackHandler(req, res) {
    githubTokenToProfile(req)
        .then((body) => {
            const response = JSON.parse(body);
            const userProfile = {
                username: response.login,
                userEmail: response.email,
                userToken: req.query.access_token,
                provider: PROVIDER.GITHUB
            };

            _responseToSession(req, res, userProfile);

            return res.redirect('/lobby');
        })
        .catch((err) => {
            console.log(err);

            return res.redirect('/login');
        });
};

const googleCallbackHandler = function googleCallbackHandler(req, res) {
    // FIXME: this is confusing, fix it
    _verifyGoogleToken(req.query)
        .then((tokenResponse) => _requestGoogleUserInfo(req.query.access_token)
            .then((response) => {
                const parsedResponse = JSON.parse(response);
                const userProfile = {
                    username: parsedResponse.email,
                    userEmail: parsedResponse.email,
                    userToken: req.query.access_token,
                    provider: PROVIDER.GOOGLE,
                };

                _responseToSession(req, res, userProfile);

                return res.redirect('/lobby');
            })
            .catch((error) => { throw error; })
        )
        .catch((err) => {
            console.log(err);

            return res.redirect('/login');
         });
};

const twitterCallbackHandler = function twitterCallbackHandler(req, res) {
    const oauthSuccessResponse = req.query;

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
    twitter.query()
        .select('users/show')
        .where({
            user_id: oauthSuccessResponse.raw.user_id
        })
        .auth(oauthSuccessResponse.access_token, oauthSuccessResponse.access_secret)
        .request(function(error, response, body) {
            if (error) {
                console.log(error);

                res.redirect('/login');
            }

            const userProfile = {
                username: `@${body.screen_name}`,
                userEmail: '',
                userToken: oauthSuccessResponse.access_token,
                provider: PROVIDER.TWITTER,
            };

            _responseToSession(req, res, userProfile);

            res.redirect('/lobby');
        });
};

// {
//     "access_token": string,
//     "raw": {
//         "access_token": string,
//         "scope": sting,
//         "token_type": string
//     }
// }
function githubTokenToProfile(req) {
    const options = {
        url: `https://api.github.com/user?access_token=${req.query.access_token}`,
        headers: {
            'User-Agent': 'othello23'
        }
    };

    return request(options);
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
function _verifyGoogleToken(oauthSuccessResponse) {
    return request(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${oauthSuccessResponse.raw.id_token}`);
}

function _requestGoogleUserInfo(accessToken) {
    return request(`https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${accessToken}`);
}

function _responseToSession(req, res, userProfile) {
    req.session.username = userProfile.username;
    req.session.userEmail = userProfile.userEmail;
    req.session.userToken = userProfile.userToken;
    req.session.provider = userProfile.provider;
}

module.exports = {
    githubCallbackHandler: githubCallbackHandler,
    googleCallbackHandler: googleCallbackHandler,
    twitterCallbackHandler: twitterCallbackHandler,
};


