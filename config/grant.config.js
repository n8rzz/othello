module.exports = {
    development: {
        server: {
            protocol: 'http',
            host: 'dummy.com:4321'
        },
        github: {
            key: process.env.GITHUB_OAUTH_KEY,
            secret: process.env.GITHUB_OAUTH_SECRET,
            callback: '/handle_github_callback',
            scope: [
                'read:user'
            ]
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
        github: {
            key: process.env.GITHUB_OAUTH_KEY,
            secret: process.env.GITHUB_OAUTH_SECRET,
            callback: '/handle_github_callback',
            scope: [
                'user'
            ]
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
