import axios from 'axios';

class Filmworld {
    constructor() {
        this.instance = axios.create({
            baseURL: 'http://webjetapitest.azurewebsites.net/api/filmworld',
            timeout: 4000,
            headers: {
                'x-access-token': process.env.MOVIE_ACCESS_TOKEN
            }
        });
    }

    list() {
        const url = '/movies'; 
        return this.instance.get(url);
    }

    getDetails(id) {
        const url = `/movie/${id}`;
        return this.instance.get(url);
    }
}

export default Filmworld;