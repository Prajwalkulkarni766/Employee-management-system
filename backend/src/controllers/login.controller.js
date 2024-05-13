import Login from "../models/login.model.js";
import generateToken from "../utils/token.js";
import { sendResponse } from "../utils/response.js";

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // username or password not provided
    if (!userName || !password) {
      return sendResponse(
        res,
        401,
        false,
        "Please provide user name and password"
      );
    }

    // const user = await Login.findOne({ userName: userName });

    // user not found
    // if (!user) {
    //   return sendResponse(res, 401, false, "User with provided name not found");
    // }
    // password mismatch
    // else if (password != user.password) {
    //   return sendResponse(res, 401, false, "Password is wrong");
    // }

    const token = generateToken("65eb41858f9886465482df1c");

    res
      .status(200)
      .cookie("token", token, { httpOnly: true, secure: true })
      .json({ status: true, message: "login successful", token: token });
  } catch (error) {
    return sendResponse(res, 500, false, "Server error");
  }
};

export { login };
