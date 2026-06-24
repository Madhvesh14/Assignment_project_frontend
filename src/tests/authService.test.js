import API from "../services/api";
import {
  loginUser,
  registerUser
} from "../services/authService";

jest.mock("../services/api");

describe("Auth Service", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("loginUser should call login API", async () => {

    const loginData = {
      emailId: "test@gmail.com",
      password: "123456"
    };

    API.post.mockResolvedValue({
      data: {
        token: "sample-token",
        role: "User"
      }
    });

    const result = await loginUser(loginData);

    expect(API.post).toHaveBeenCalledWith(
      "/Auth/login",
      loginData
    );

    expect(result.data.token)
      .toBe("sample-token");
  });

  test("registerUser should call register API", async () => {

    const userData = {
      fullName: "John Doe",
      emailId: "john@gmail.com",
      password: "123456",
      roleId: 2
    };

    API.post.mockResolvedValue({
      data: "Registration Successful"
    });

    const result = await registerUser(userData);

    expect(API.post).toHaveBeenCalledWith(
      "/Auth/register",
      userData
    );

    expect(result.data)
      .toBe("Registration Successful");
  });

});