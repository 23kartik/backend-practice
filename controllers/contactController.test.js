const {
    getContact,
    postContact,
    deleteContact,
    getByContact,
    updateContact,
  } = require('../controllers/contactController');
  const Contact = require('../models/contactModel');
  
  describe('Contact Controller Tests', () => {
    describe('getContact Function', () => {
      it('should get all contacts for a user', async () => {
        const req = {
          user: { id: '12345' },
        };
  
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        const findMock = jest.spyOn(Contact, 'find');
        findMock.mockResolvedValue([{ name: 'Contact 1' }, { name: 'Contact 2' }]);
  
        await getContact(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ name: 'Contact 1' }, { name: 'Contact 2' }]);
      });
  
      // Add more test cases for error scenarios, empty results, etc.
    });
  
    describe('postContact Function', () => {
      it('should create a new contact', async () => {
        const req = {
          user: { id: '12345' },
          body: {
            name: 'New Contact',
            email: 'contact@example.com',
            phone: '1234567890',
          },
        };
  
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        const createMock = jest.spyOn(Contact, 'create');
        createMock.mockResolvedValue({
          name: 'New Contact',
          email: 'contact@example.com',
          phone: '1234567890',
        });
  
        await postContact(req, res);
  
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
          name: 'New Contact',
          email: 'contact@example.com',
          phone: '1234567890',
        });
      });
  
      // Add more test cases for validation, error scenarios, etc.
    });
  
    describe('deleteContact Function', () => {
      it('should delete a contact by ID', async () => {
        const req = {
          user: { id: '12345' },
          params: { id: '54321' },
        };
  
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        const findByIdMock = jest.spyOn(Contact, 'findById');
        findByIdMock.mockResolvedValue({
          name: 'Contact to Delete',
          user_id: '12345',
        });
  
        const deleteOneMock = jest.spyOn(Contact, 'deleteOne');
        deleteOneMock.mockResolvedValue({
          name: 'Contact to Delete',
          user_id: '12345',
        });
  
        await deleteContact(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          name: 'Contact to Delete',
          user_id: '12345',
        });
      });
  
      // Add more test cases for error scenarios, permission checks, etc.
    });
  
    describe('getByContact Function', () => {
      it('should get a contact by ID', async () => {
        const req = {
          params: { id: '54321' },
        };
  
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        const findByIdMock = jest.spyOn(Contact, 'findById');
        findByIdMock.mockResolvedValue({
          name: 'Contact to Retrieve',
        });
  
        await getByContact(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          name: 'Contact to Retrieve',
        });
      });
  
      // Add more test cases for error scenarios, contact not found, etc.
    });
  
    describe('updateContact Function', () => {
      it('should update a contact by ID', async () => {
        const req = {
          user: { id: '12345' },
          params: { id: '54321' },
          body: {
            name: 'Updated Contact',
            email: 'updated@example.com',
            phone: '9876543210',
          },
        };
  
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        const findByIdMock = jest.spyOn(Contact, 'findById');
        findByIdMock.mockResolvedValue({
          name: 'Contact to Update',
          user_id: '12345',
        });
  
        const findByIdAndUpdateMock = jest.spyOn(Contact, 'findByIdAndUpdate');
        findByIdAndUpdateMock.mockResolvedValue({
          name: 'Updated Contact',
          email: 'updated@example.com',
          phone: '9876543210',
        });
  
        await updateContact(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          name: 'Updated Contact',
          email: 'updated@example.com',
          phone: '9876543210',
        });
      });
  
      // Add more test cases for error scenarios, permission checks, etc.
    });
  });
  