export const getErrorMessage = (
  error,
  defaultMessage = "An error occurred. Please try again.",
) => {
  if (!error) {
    return defaultMessage;
  }

  if (typeof error === "string") {
    return error;
  }

  if (error.message) {
    return error.message;
  }

  if (error.error?.message) {
    return error.error.message;
  }

  if (error.message) {
    return error.message;
  }

  if (typeof error === "object") {
    for (const key of ["message", "msg", "detail", "details"]) {
      if (error[key]) {
        return error[key];
      }
    }

    if (Object.keys(error).length > 0) {
      return JSON.stringify(error);
    }
  }

  return defaultMessage;
};
