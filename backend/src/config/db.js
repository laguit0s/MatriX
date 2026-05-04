const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient ({
  errorFormat: 'minimal',
});

module.exports = prisma;