const path = require('path');
require('dotenv').config({path: path.join(__dirname,'..','.env')});
import express = require('express');
import bodyParser = require('body-parser');
import swaggerUi = require('swagger-ui-express');
import cors = require('cors');
import http = require('http');
import fs = require('fs');
import morgan = require('morgan');
import {Errors} from "./constants/Errors";
import container from "./../inversify.base.config";
import TYPES from "../types";
import {SecurityBusinessManager} from "./businessManagers/impl/SecurityBusinessManager";
const port = parseInt(process.env.EXPOSE_PORT || '8084');
const app = (module.exports = express());
const swaggerDocument = require('../api-docs/swaggerConfig');
import {Server, Socket} from "socket.io";
import { RequestHandler } from 'express';
const httpsOptions = {
  // key: fs.readFileSync('./key.pem', 'utf-8'),
  // cert: fs.readFileSync('./cert.pem', 'utf-8')
};

// @ts-ignore
const securityBusinessManager = container.get<SecurityBusinessManager>(TYPES.SecurityBusinessManager);

app.use(
  bodyParser.urlencoded({
    limit: "500mb",
    parameterLimit: 500000,
    extended: false,
  }) as RequestHandler
);

app.use(bodyParser.json({ limit: "500mb" }) as RequestHandler);

app.use(cors({origin: true, credentials: true}));
app.use(morgan("dev") as RequestHandler);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));





app.use('/registration', require('./routes/registrationRoute'));
app.get('/version', (req: any, res: any) => {
  return res.status(200).json({ data: 87 });
});

app.use(async(req:any, res:any, next:any) => {
    if(req.url.indexOf(`clever`) >= 0 || req.url.indexOf(`reset`) >= 0) {
        return next();
    }

    const auth = req.headers.authorization
        ? Buffer.from(req.headers.authorization.split(" ")[1]).toString()
        : null;

    if((req.headers.referer && req.headers.referer.indexOf(`/docs`) >= 0)
        || (req.headers.authorization && auth.indexOf(process.env.API_ADMIN_PASSWORD) >= 0)) {
            console.log('authorization', req.headers.authorization)

        req.locals = {admin: true};

        return next();
    }

    if(req.url.startsWith("/version")) {
        return next();
    }

    if(!req.headers.authorization || req.headers.authorization === '') {
        return res.status(403).json({error: Errors.notAuthorized});
    }
    console.log('authorization', req.headers.authorization)
    let user = await securityBusinessManager
        .verifyUser(req.headers.authorization)
        .catch((error: any) => {
            return res.status(error.response.status).json({error: error.response.statusText})
        });

    if(user.locals) return;

    req.locals={
        auth0Id: user.auth0Id,
        userId: user.userId
    };

    next();
});

app.use('/account', require('./routes/accountRoute'));
app.use('/accountType', require('./routes/accountTypeRoute'));
app.use('/activity', require('./routes/activityRoute'))
app.use('/activityType', require('./routes/activityTypeRoute'));
app.use('/authKey', require('./routes/accountIndexRoute'));
app.use('/bundle', require('./routes/bundleRoute'));
app.use('/bundleQueue', require('./routes/bundleQueueRoute'));
app.use('/course', require('./routes/courseRoute'));
app.use('/courseWorkbook', require('./routes/courseWorkbookRoute'));
app.use('/courseWorkbookActivity', require('./routes/courseWorkbookActivityRoute'));
app.use('/lessonPlan', require('./routes/lessonPlanRoute'));
app.use('/lessonPlanStep', require('./routes/lessonPlanStepRoute'));
app.use('/pairings', require('./routes/paringsRoute'));
app.use('/passage', require('./routes/passageRoute'));
app.use('/file', require('./routes/fileRoute'));
app.use('/payment', require('./routes/paymentRoute'));
app.use('/plan', require('./routes/planRoute'));
app.use('/phrase', require('./routes/phraseRoute'));
app.use('/sentence', require('./routes/sentenceRoute'));
app.use('/settings', require('./routes/settingsRoute'));
app.use('/sharing', require('./routes/bundleRoute'));
app.use('/settings', require('./routes/settingsRoute'));
app.use('/subscription', require('./routes/subscriptionRoute'));
// app.use('/tileBank', require('./routes/tileBankRoute'));
app.use('/tiles', require('./routes/tilesRoute'));
app.use('/user', require('./routes/userRoute'));
app.use('/userSettings', require('./routes/userSettingsRoute'));
app.use('/userActivitySettings', require('./routes/userActivitySettingsRoute'));
app.use('/word', require('./routes/wordRotue'));
app.use('/workbook', require('./routes/workbookRoute'));
app.use('/workbookFile', require('./routes/workbookFileRoute'));
app.use('/workbookPassage', require('./routes/workbookPassageRoute'));
app.use('/workbookPhrase', require('./routes/workbookPhraseRoute'));
app.use('/workbookSentence', require('./routes/workbookSentenceRoute'));
app.use('/version', require('./routes/versionRoute'));

const httpServer = http.createServer({}, app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.SOCKETS_ALLOWED_ORIGIN,
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket: Socket) => {
    socket.on('login', (msg: string) => {
       socket.broadcast.emit('login', msg);
    });
});

httpServer.listen(port)
  .on('listening', console.log.bind(console, 'Listening On ' + port));
