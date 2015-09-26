/**
 * Created by liormb on 9/26/15.
 */

'use strict';

module.exports = {
    entry: './app-client.js',
    output: {
        filename: 'public/bundle.js'
    },
    module: {
        loaders: [
            { exclude: /(node_modules|app-server.js)/, loader: 'babel' }
        ]
    }
};