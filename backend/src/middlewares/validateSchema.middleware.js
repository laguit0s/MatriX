const { z } = require('zod');

function validate(schema) {
    return (req, res, next) => {
        try {
            const result = schema.parse({
                body: req.body,
                params: req.params,
                query: req.query,
            })
            req.validatedData = result;
            next();
        } catch(err) {
            console.log(err);
            next(err);
        }
    }
}

module.exports = validate;