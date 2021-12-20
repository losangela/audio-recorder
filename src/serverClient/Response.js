export const handleResponse = (response) => response;

export const handleError = (error) => {
  console.log(
    '*** serverClient Error - START ***\n',
    error.response?.data || error.message,
    '\n*** serverClient Error - END ***',
  );

  if (error.response?.data) {
    throw new Error(Object.values(error.response.data.errors).join(', '));
  }

  if (error.message) {
    throw new Error(error.message);
  }
};

