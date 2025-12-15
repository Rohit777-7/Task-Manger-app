import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { RegisterDto, LoginDto } from "../dtos/auth.dto";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const parsed = RegisterDto.parse(req.body);
      const result = await authService.register(parsed);

      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Registration failed"
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const parsed = LoginDto.parse(req.body);
      const result = await authService.login(parsed);

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Login failed"
      });
    }
  }
}
