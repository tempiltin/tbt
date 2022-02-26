module.exports = function (req, res, next) {
    res.locals.isAuth = req.session.isAuthen // true
    res.locals.admin = req.session.admin
    next()
}