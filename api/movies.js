module.exports.getMovies = (req, res) => {
    console.log('testing');
    res.send(`Recieved request: ${req.query.test}`);
}
