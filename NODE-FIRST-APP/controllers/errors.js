const notFound = (req, res, next) => {
    res.status(404).render("404", {pageTitle: "Page Not Found"});
};

module.exports = {
    notFound: notFound
}