const { Prisma } = require('@prisma/client');
const AppError = require('../errors/AppError');

const prismaErrors = {
  P2000: { message: 'Input value is too long', statusCode: 400 },
  P2001: { message: 'Record does not exist', statusCode: 404 },
  P2002: { message: 'Duplicate value violates unique constraint', statusCode: 409 },
  P2003: { message: 'Invalid foreign key reference', statusCode: 400 },
  P2011: { message: 'Required field is missing', statusCode: 400 },
  P2012: { message: 'Missing required input value', statusCode: 400 },
  P2014: { message: 'Invalid relation operation', statusCode: 400 },
  P2021: { message: 'Database table does not exist', statusCode: 500 },
  P2022: { message: 'Database column does not exist', statusCode: 500 },
  P2024: { message: 'Database connection timeout', statusCode: 503 },
  P2025: { message: 'Requested record was not found', statusCode: 404 },
  P2034: { message: 'Transaction conflict detected', statusCode: 409 },
};

function handleDbError(err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const prismaError = prismaErrors[err.code];

        if (prismaError) {
            throw new AppError(prismaError.message, prismaError.statusCode);
        }

        throw new AppError("Database operation failed", 500);
    }

    throw new AppError("Internal server error", 500);
}

module.exports = handleDbError;