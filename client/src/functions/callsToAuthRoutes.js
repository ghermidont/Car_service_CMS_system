import axios from "axios";

export const createUser = async (authToken, newUser) => {
  return await axios.post(`${process.env.REACT_APP_API}/create-update-user`, newUser,{ headers: {authToken},
    }
  );
};

export const updateUser = async (authToken, newUser) => {
    return await axios.post(`${process.env.REACT_APP_API}/create-update-user`, newUser,{ headers: {authToken},
        }
    );
};

export const currentUser = async (authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};

//
export const currentAdmin = async (authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-admin`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};
