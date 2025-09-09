import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findOne(id: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async create(userData: Partial<User>): Promise<User> {
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }
        const user = this.usersRepository.create(userData);
        return this.usersRepository.save(user);
    }

    async findOrCreateGoogleUser(googleData: any): Promise<User> {
        let user = await this.findByEmail(googleData.email);

        if (!user) {
            user = await this.create({
                email: googleData.email,
                firstName: googleData.firstName,
                lastName: googleData.lastName,
                googleId: googleData.id,
            });
        }

        return user;
    }
}