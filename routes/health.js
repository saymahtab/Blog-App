const { Router } = require('express');
const healthRouter = Router;

const { health } = require('../handlers/health')

healthRouter.get('/', health)

module.exports = {
    healthRouter,
}