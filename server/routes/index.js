const path = require('path');
const router = require('express').Router();

router.get('*', (req, res) => {
    const route = path.join(__dirname, '..', '..', 'dist', 'index.html');
    res.sendFile(route);
});

router.get('*.js', (req, res, next) => {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
});

module.exports = router;