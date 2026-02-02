const asyncErrorBoundary = require('../../errors/asyncErrorBoundary');
const theatersService = require('./theaters.service');

async function list(req, res) {
    const data = await theatersService.list();
    res.json({ data });
};

async function read(req, res) {
    const data = await theatersService.read(req.params.theaterId);
    res.json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: asyncErrorBoundary(read),
};