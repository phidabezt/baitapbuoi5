import * as bcrypt from 'bcrypt';
import { users } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async create(email, password): Promise<users> {
    // Check if the user already exists
    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('User already exists'); // Throw an error if the user already exists
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and return the new user
    const user = await this.usersService.create(email, hashedPassword);

    return user; // Return the newly created user
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, password: user.password, id: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.SECRET_KEY,
        expiresIn: '1d',
      }),
      user_id: user.id,
    };
  }

  async getUserIdFromToken(token: string) {
    try {
      const decoded = await this.jwtService.verify(token); // Verify the token
      return decoded.id; // Adjust the field if it's `sub` or something else
    } catch (err) {
      console.error('Invalid token:', err.message);
      return null;
    }
  }
}
