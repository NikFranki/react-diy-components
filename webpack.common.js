const path = require('path');
const webpack = require('webpack');

const getPath = (filePath) => path.resolve(__dirname, filePath);
const basePath = process.env.NODE_ENV === 'production' ? 'build/dist/' : 'build/dev/';
console.log('current env: ', process.env.NODE_ENV);

// const isNpmPublish = false; // npm 发布打包入一个文件里面
const isNpmPublish = true; // npm 发布打包入一个文件里面
const entry = isNpmPublish ? './src/index.ts' : {
    'lib': [
        'react',
        'react-dom',
        'react-router-dom',
        'react-redux',
        'redux',
        'redux-thunk',
        'lodash',
        'history'
    ],
    'index': ['./src/index.tsx']
};
const output = isNpmPublish ? {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2'
} : {
    path: getPath(basePath),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
};

const optimization = {
    splitChunks: {
        cacheGroups: {
            'lib': {
                name: 'lib',
                chunks: 'initial',
                priority: 2,
                minChunks: 2,
            },
        }
    }
};

const config = {
    mode: 'development',
    // Plugins
    plugins: [
        new webpack.DefinePlugin({
            'process.browser': true
        })
    ],
    optimization,
    // Entry
    entry,
    // Output
    output,
    // Loaders
    module: {
        rules: [
            {
                test : /\.(jsx?|tsx?)$/,
                include : path.resolve(__dirname, 'src'),
                use:['babel-loader', 'ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name(file) {
                                return path.relative(path.join(__dirname, 'src'), file);
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    // Resolve
    resolve: {
        alias: {
            api: path.resolve(__dirname, 'src/api/'),
            components: path.resolve(__dirname, 'src/components/'),
            constant: path.resolve(__dirname, 'src/constant/'),
            lib: path.resolve(__dirname, 'src/lib/'),
            reducers: path.resolve(__dirname, 'src/reducers/'),
            router: path.resolve(__dirname, 'src/router/'),
            store: path.resolve(__dirname, 'src/store/'),
            util: path.resolve(__dirname, 'src/util/'),
            model: path.resolve(__dirname, 'src/model/')
        },
        extensions: ['.wasm', '.mjs', '.ts', '.tsx', '.jsx', '.js', '.json']
    },
    // node
    node: {
        fs: 'empty',
        module: 'empty'
    }
};

module.exports = config;