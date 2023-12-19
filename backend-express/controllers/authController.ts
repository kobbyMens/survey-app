import { Response, Request, NextFunction } from "express";
import adminModel from "../models/adminModel";
import bcrypt from "bcrypt";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { firstName, lastName, email, password } = req.body;
    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();

    //email format validation.
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      res.json({ message: "Invalid email", status: "Failed" });
    }
    //check if email already exist
    let existingEmail = await adminModel.findOne({ email });

    if (existingEmail) {
      res.json({ message: "Account already exist", status: "Failed" });
    } else {
      let hashedPassword = await bcrypt.hash(password, 10);
      await adminModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      res.json({
        user: { firstName, lastName, email },
        status: "Successful",
        message: "New account created successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { email, password } = req.body;
    email = email.trim();
    if (password === "" || email === "") {
      res.json({
        message: "Email and password are required field",
        status: "Failed",
      });
    }

    let matchedEmail = await adminModel.findOne({ email });

    if (matchedEmail) {
      let passwordMatch = await bcrypt.compare(password, matchedEmail.password);
      if (passwordMatch) {
        res.json({
          user: {
            email: matchedEmail.email,
            firstName: matchedEmail.firstName,
            lastName: matchedEmail.lastName,
          },
          message: "Login successful",
          status: "Successful",
        });
      } else {
        res.json({ message: "Invalid email or password", status: "Failed" });
      }
    } else {
      res.json({ message: "Invalid email or password", status: "Failed" });
    }
  } catch (error) {
    next(error);
  }
};
