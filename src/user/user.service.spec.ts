import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  const mockUser: User = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
    createdBy: 1,
    lastLoginAt: new Date('2024-01-01T11:43:54.000Z'),
    password: '123456',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: jest.fn().mockResolvedValue([mockUser]),
              create: jest.fn().mockResolvedValue(mockUser),
              findUnique: jest.fn().mockResolvedValue(mockUser),
              update: jest.fn().mockResolvedValue(mockUser),
              delete: jest.fn().mockResolvedValue(mockUser),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllUsers', () => {
    it('should return an array of users', async () => {
      const users = await service.findAllUsers();
      expect(users).toEqual([mockUser]);
      expect(prismaService.user.findMany).toHaveBeenCalled();
    });
  });

  describe('createUser', () => {
    it('should create and return a user', async () => {
      const user = await service.createUser({
        email: mockUser.email,
        name: mockUser.name,
        password: mockUser.password,
      });
      expect(user).toEqual(mockUser);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          email: mockUser.email,
          name: mockUser.name,
          password: mockUser.password,
        },
      });
    });
  });

  describe('findUserByEmail', () => {
    it('should return a user by email', async () => {
      const user = await service.findUserByEmail(mockUser.email);
      expect(user).toEqual(mockUser);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: mockUser.email },
      });
    });
  });

  describe('findUserById', () => {
    it('should return a user by id', async () => {
      const user = await service.findUserById(mockUser.id);
      expect(user).toEqual(mockUser);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      });
    });
  });

  describe('updateUser', () => {
    it('should update and return the updated user', async () => {
      const updatedUser = await service.updateUser(mockUser.id, {
        name: 'Updated Name',
      });
      expect(updatedUser).toEqual(mockUser);
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: { name: 'Updated Name' },
      });
    });
  });

  describe('deleteUser', () => {
    it('should delete a user and return true', async () => {
      const result = await service.deleteUser(mockUser.id);
      expect(result).toBe(true);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      });
      expect(prismaService.user.delete).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      });
    });

    it('should return false if user does not exist', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(null);
      const result = await service.deleteUser(mockUser.id);
      expect(result).toBe(false);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      });
      expect(prismaService.user.delete).not.toHaveBeenCalled();
    });
  });
});
