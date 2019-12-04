'use strict'
const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const boom = require('boom')
const { config } = require('../../../config')
