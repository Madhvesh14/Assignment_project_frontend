import API from "./api";

export const loginUser = async (loginData) => {
  
    return await API.post("/Auth/login", loginData);

};

export const registerUser = async (userData) => {
    
    return await API.post("/Auth/register", userData);

};

