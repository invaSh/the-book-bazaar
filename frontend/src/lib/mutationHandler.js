import { toast } from 'react-hot-toast';

/**
 * Handles API responses for POST, PUT, DELETE operations
 * @param {Object} response - API response
 * @param {string} loading - The ID of the active loading toast (from `toast.loading()`)
 */

export const mutationHandler = (response, loading) => {
  let errorList;
  if (response.error) {
    const errorData = response.error;
    if (errorData.errors.length === 1) {
      toast.dismiss(loading);
      toast.error(errorData.errors[0].message);
    } else {
      toast.dismiss(loading);
      errorList = response.error.errors;
    }
  }
  return Object.fromEntries(
    Object.entries(errorList).map(([key, value]) => [
      key.charAt(0).toLowerCase() + key.slice(1),
      value,
    ])
  );
};
