module.exports = {
    development: {
        server: {
            protocol: 'http',
            host: 'dummy.com:4321'
        },
        google: {
            key: process.env.GOOGLE_OAUTH_KEY,
            secret: process.env.GOOGLE_OAUTH_SECRET,
            callback: '/handle_google_callback',
            scope: [
                'email',
                'profile'
            ]
        },
        twitter: {
            key: process.env.TWITTER_OAUTH_KEY,
            secret: process.env.TWITTER_OAUTH_SECRET,
            callback: '/handle_twitter_callback'
        }
    },
    staging: {},
    production: {
        server: {
            protocol: 'http',
            host: 'dummy.com:4321'
        },
        google: {
            key: process.env.GOOGLE_OAUTH_KEY,
            secret: process.env.GOOGLE_OAUTH_SECRET,
            callback: '/handle_google_callback',
            scope: [
                'email',
                'profile'
            ]
        },
        twitter: {
            key: process.env.TWITTER_OAUTH_KEY,
            secret: process.env.TWITTER_OAUTH_SECRET,
            callback: '/handle_twitter_callback'
        }
    }
};
