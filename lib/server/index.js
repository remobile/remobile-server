import bodyParser from 'body-parser';
import connectMongo from 'connect-mongo';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import morgan from 'morgan';
import multer from 'multer';
import passport from 'passport';
import path from 'path';
import session from 'express-session';

import config from '../../config';
import routers from './routers';
import schema from './schema';

const app = express();

app.use(morgan('short'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: 100000000}));

// View engine
app.set('views', path.join(__dirname, 'components'));

// session
const MongoStore = connectMongo(session);
app.use(session({
    secret: 'Is very secret',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Static files
app.use(express.static(path.resolve('public')));
app.use(['favicon.ico', '/images*', '/media*', '/css*', '/fonts*', '/assets*'], (req, res) => {
    res.status(404).end();
});

// Multer
app.use('/graphql', multer({dest: './uploads/'}).single('file'));

// GraphqQL server
app.use('/graphql', graphqlHTTP(req => ({
    schema: schema.getSchema(),
    rootValue: {
        isAuthenticated: req.isAuthenticated(),
        administrator: req.user,
    },
    graphiql: true
})));

app.use(async (req, res, next) => {
    res.locals.header = [
        {
            tag: 'title',
            content: '后台系统'
        },
        {
            tag: 'link',
            props: {
                rel: 'stylesheet',
                type: 'text/css',
                href: '/css/antd.min.css'
            }
        },
    ];

    if (process.env.NODE_ENV !== 'production') {
        res.baseScriptsURL = `http://localhost:${config.devPort}`;
        res.locals.header.push({
            tag: 'script',
            props: {
                src: `${res.baseScriptsURL}/webpack-dev-server.js`
            }
        });
    } else {
        res.baseScriptsURL = '';
    }

    // footer
    res.locals.footer = [{
        tag: 'script',
        props: {
            src: `${res.baseScriptsURL}/assets/common.js`
        }
    }];

    next();
});


app.use(routers.authRouter);
app.use(routers.adminRouter);
app.use(routers.publicRouter);

app.use((req, res) => {
    res.status(404).end();
});

app.use((error, req, res) => {
    const statusCode = error.statusCode || 500;
    const err = {
        error: statusCode,
        message: error.message
    };
    if (!res.headersSent) {
        res.status(statusCode).send(err);
    }
});

export default app;
