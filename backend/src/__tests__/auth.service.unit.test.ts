
import { jest, describe, it, expect } from '@jest/globals';

const mockFindOne: any = jest.fn();
jest.unstable_mockModule('../shared/DB/orm.js', () => ({
  orm: {
    em: { findOne: mockFindOne },
  },
}));


jest.unstable_mockModule('bcrypt', () => ({
  default: {
    compare: jest.fn(() => Promise.resolve(true)),
  },
}));

jest.unstable_mockModule('google-auth-library', () => ({
  OAuth2Client: jest.fn().mockImplementation(() => ({})),
}));

const { authService } = await import('../auth/auth.service.js');

const fakeUser = {
  id: 'uuid-1234',
  name: 'Cliente',
  email: 'client@test.com',
  password: '$2b$10$hashedpassword',
  role: 'client',
  deletedAt: null,
};


describe('authService.login()', () => {
  it('retorna token, refreshToken y datos del usuario cuando las credenciales son correctas', async () => {
    mockFindOne.mockResolvedValue(fakeUser);

    const result = await authService.login('client@test.com', 'Test1234!');

    expect(result.token).toBeDefined();
    expect(result.refreshToken).toBeDefined();
    expect(result.user.email).toBe('client@test.com');
    expect(result.user.role).toBe('client');
  });
});
