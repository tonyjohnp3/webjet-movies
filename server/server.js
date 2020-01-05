import app from './app';

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log('Server running on port ' + port);
});

export default server;