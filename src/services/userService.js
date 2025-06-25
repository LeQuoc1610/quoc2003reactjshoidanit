import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};
const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const createNewUser = async (data) => {
  const response = await axios.post("/api/create-new-user", data);
  return response; 
};

const deleteUser = (userId) =>{
  return axios.delete('/api/delete-user',{
    data: {
      id: userId,
    },
  });
};

const updateUser = (data) => {
  return axios.put('/api/edit-user',data);
};

export { handleLoginApi, getAllUsers ,createNewUser,updateUser,deleteUser};
