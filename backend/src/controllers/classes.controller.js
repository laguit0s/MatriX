const classesService = require('../services/classes.service');

async function listClasses(req, res) {
    const classes = await classesService.listClasses();
    res.status(200).json(classes);
}

async function createClass(req, res) {
    await classesService.createClass(req.body);
    res.sendStatus(201);
}

async function deleteClass(req, res) {
    await classesService.deleteClass(req.params.id);
    res.sendStatus(204);
}

module.exports = {
    listClasses,
    createClass,
    deleteClass,
};
