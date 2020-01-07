import ApiError from '../errors/apiError';

/**
 * Reflection to add catch to Promise
 * 
 * @param {Promise} promise  
 */
export const reflect = promise => {
  return promise.catch(err => {
    if (err instanceof ApiError) {
      return {
        status: err.status,
        message: err.message,
      };
    }
    return err;
  });
};
