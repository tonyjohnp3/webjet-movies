export const mockFilmworldList = jest.fn();
export const mockFilmworldGetDetails = jest.fn();

const mock = jest.fn().mockImplementation(() => {
    return {
        list: mockFilmworldList,
        getDetails: mockFilmworldGetDetails
    }
});

export default mock;