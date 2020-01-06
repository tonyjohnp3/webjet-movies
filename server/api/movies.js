import Cinemaworld from '../services/cinemaworld';
import Filmworld from '../services/filmworld';
import Movie from '../models/movie';
import statusCodes from '../constants/statusCodes';

const Movies = {
  async list(req, res) {
    try {
      const movie = new Movie([new Filmworld(), new Cinemaworld()]);
      const result = await movie.fetchAll();
      res.send(result);
    } catch (err) {
      res.status(statusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
  },

  async getDetails(req, res) {
    try {
      const ids = [req.params.fwid, req.params.cwid];
      const movie = new Movie([new Filmworld(), new Cinemaworld()]);
      const result = await movie.getDetails(ids);
      res.send(result);
    } catch (err) {
      res.status(statusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
  },
};

export default Movies;
