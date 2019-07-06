exports.getIndex = (req, res, next) => {
    res.render('404', {
        pageTitle: 'Sorry we can not find the page'
    });
}
