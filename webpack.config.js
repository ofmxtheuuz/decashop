const path = require('path');


// em desenvolvimento....
module.exports = {
    mode: 'development',
    entry: {
        index: 'YOUR_INDEX_LOCATION'
    },
    output: {
        path: path.resolve(__dirname, 'release'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
};