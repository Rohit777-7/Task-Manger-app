import prisma from "../config/prisma";
import { RegisterInput, LoginInput } from "../dtos/auth.dto";

export class AuthService {
  async register(data: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    // password hashing will be added next step
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name
      }
    });

    return user;
  }

  async login(data: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // password compare will be added next step
    return user;
  }
}
