import axios from "axios";

export const getCMSUsersListFunction = async (authToken) => {
    await axios.get(`${process.env.REACT_APP_API}/admin/cms-users-list`, { headers: { authToken } })
};

export const approveCMSUserFunction = async (CMSUserId, decision, authToken) => {
  await axios.put( `${process.env.REACT_APP_API}/admin/approve-cms-user`,  { CMSUserId, decision },
    { headers: { authToken:  authToken }}
  )
};
