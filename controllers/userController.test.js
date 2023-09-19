const { postUser, loginUser } = require('../controllers/userController');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

describe('User Controller Tests', () => {
  describe('postUser Function', () => {
    it('should create a new user', async () => {
      const req = {
        body: {
          username: 'testuser',
          email: 'test@example.com',
          password: 'testpassword',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const findOneMock = jest.spyOn(User, 'findOne');
      findOneMock.mockResolvedValue(null);

      const createMock = jest.spyOn(User, 'create');
      createMock.mockResolvedValue({
        _id: '12345',
        username: 'testuser',
        email: 'test@example.com',
      });

      const compareMock = jest.spyOn(bcrypt, 'compare');
      compareMock.mockResolvedValue(true);

      const signMock = jest.spyOn(jwt, 'sign');
      signMock.mockReturnValue('testAccessToken');

      await postUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ email: 'test@example.com' });
    });

    // Add more test cases for error scenarios, validation, etc.
  });

  describe('loginUser Function', () => {
    it('should log in a user', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'testpassword',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const findOneMock = jest.spyOn(User, 'findOne');
      findOneMock.mockResolvedValue({
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
      });

      const compareMock = jest.spyOn(bcrypt, 'compare');
      compareMock.mockResolvedValue(true);

      const signMock = jest.spyOn(jwt, 'sign');
      signMock.mockReturnValue('testAccessToken');

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ accessToken: 'testAccessToken' });
    });

    // Add more test cases for error scenarios, invalid credentials, etc.
  });
});
