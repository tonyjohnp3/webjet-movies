module.exports.getMovies = (req, res) => {
    res.send(`Recieved request: ${req.query.test}`);
}
