export const mockCinemaworldList = jest.fn();
export const mockCinemaworldGetDetails = jest.fn();

const mock = jest.fn().mockImplementation(() => {
    return {
        list: mockCinemaworldList,
        getDetails: mockCinemaworldGetDetails
    }
});

export default mock;