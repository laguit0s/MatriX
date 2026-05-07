const classesService = require('../services/classes.service');

async function listClasses(req, res) {
    const classes = await classesService.listClasses();
    res.status(200).json(classes);
}

async function listClass(req, res) {
    const _class_ = await classesService.listClass(req.params.id);
    res.status(200).json(_class_);
}

async function createClass(req, res) {
    await classesService.createClass(req.body);
    res.sendStatus(201);
}

async function deleteClass(req, res) {
    await classesService.deleteClass(req.params.id);
    res.sendStatus(204);
}

async function updateClass(req, res) {
    await classesService.updateClass(req.body, req.params.id);
    res.sendStatus(204);
}

module.exports = {
    listClasses,
    createClass,
    deleteClass,
    listClass,
    updateClass,
};
