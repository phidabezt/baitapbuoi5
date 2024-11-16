import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.users.create({
      data: { email, password: hashedPassword },
    });
  }

  async findByEmail(email: string){
    return this.prisma.users.findUnique({ where: { email } });
  }
}
