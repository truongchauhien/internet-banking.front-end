const dotenv = require('dotenv');
const convict = require('convict');
const webpack = require('webpack');

/*
Notice:
- Environment variables that are already defined in `process.env` will not be overwritten by dotenv.
- You can use 'cross-env' to set environment variables in commandline or npm scripts, and the values will not be overwritten.
*/
dotenv.config();

const schema = convict({
    env: {
        default: 'development',
        env: 'NODE_ENV'
    },
    useHttps: {
        default: false
    },
    apiHost: {
        default: 'localhost'
    },
    apiPort: {
        default: 3000
    },
    reCaptchaSiteKey: {
        default: '',
    }
});

const env = schema.get('env');
schema.loadFile(`./config.${env}.json`);
schema.validate({ allowed: 'strict' });

const envConfigPlugin = new webpack.DefinePlugin({
    'NODE_ENV': JSON.stringify(schema.get('env')),
    'USE_HTTPS': JSON.stringify(schema.get('useHttps')),
    'API_HOST': JSON.stringify(schema.get('apiHost')),
    'API_PORT': JSON.stringify(schema.get('apiPort')),
    'RECAPTCHA_SITE_KEY': JSON.stringify(schema.get('reCaptchaSiteKey'))
});

module.exports = envConfigPlugin;
