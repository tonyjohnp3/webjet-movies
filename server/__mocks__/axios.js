export const mockGet = jest.fn(() => Promise.resolve({}));
export const mockCreate = jest.fn().mockImplementation(obj => {
  return {
    ...obj,
    get: mockGet,
  };
});

export default {
  create: mockCreate,
  get: mockGet,
};
