const get404Page = (req, res, next) => {
    res.status(404).render("404", {pageTitle: "Page Not Found"});
};

module.exports = {
    get404Page: get404Page
}