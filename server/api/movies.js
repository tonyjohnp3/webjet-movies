const Movies = {
    list(req, res) {
        res.send(`Recieved : ${req.query.test}`);
    },
};

export default Movies;