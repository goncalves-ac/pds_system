"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const firebase = require('firebase');
const config = require('./config');
const db = firebase.initializeApp(config.firebaseConfig);
exports.db = db;
