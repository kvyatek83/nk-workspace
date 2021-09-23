import { Injectable } from '@nestjs/common';

export enum Role {
  User = 'User',
  Admin = 'Admin',
}

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  token?: string;
}

@Injectable()
export class UserService {
  users: User[] = [
    {
      id: 1,
      username: 'admin',
      password: 'admin',
      email: 'a@a.a',
      firstName: 'Admin',
      lastName: 'User',
      role: Role.Admin,
    },
    {
      id: 2,
      username: 'user',
      password: 'user',
      email: 'b@b.b',
      firstName: 'Normal',
      lastName: 'User',
      role: Role.User,
    },
  ];

  getData(): { message: string } {
    return { message: 'Welcome to sand-box-server!' };
  }

//   async create(data: any): Promise<User> {
//     return this.userRepository.save(data);
//   }

  async findOne(username: string): Promise<User> {
    return this.users.find(user => user.username === username);
  }
}
