const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prismaClient = new PrismaClient({
  errorFormat: 'minimal',
});

module.exports = prismaClient;
