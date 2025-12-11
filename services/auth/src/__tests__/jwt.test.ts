import { describe, it, expect } from 'vitest';
import { generateToken, verifyToken } from '../lib/jwt';

describe('JWT Token Functions', () => {
  const mockUserId = 'test-user-123';
  const mockEmail = 'test@example.com';
  const mockRoles = ['user'];

  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const token = generateToken(mockUserId, mockEmail, mockRoles);
      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
    });

    it('should include user information in token payload', () => {
      const token = generateToken(mockUserId, mockEmail, mockRoles);
      const decoded = verifyToken(token);

      expect(decoded).toBeTruthy();
      expect(decoded?.userId).toBe(mockUserId);
      expect(decoded?.email).toBe(mockEmail);
      expect(decoded?.roles).toEqual(mockRoles);
    });
  });

  describe('verifyToken', () => {
    it('should verify and decode a valid token', () => {
      const token = generateToken(mockUserId, mockEmail, mockRoles);
      const decoded = verifyToken(token);

      expect(decoded).toBeTruthy();
      expect(decoded?.userId).toBe(mockUserId);
      expect(decoded?.email).toBe(mockEmail);
    });

    it('should return null for invalid token', () => {
      const invalidToken = 'invalid.token.here';
      const decoded = verifyToken(invalidToken);

      expect(decoded).toBeNull();
    });

    it('should return null for tampered token', () => {
      const token = generateToken(mockUserId, mockEmail, mockRoles);
      const tamperedToken = token.slice(0, -10) + 'tampered';
      const decoded = verifyToken(tamperedToken);

      expect(decoded).toBeNull();
    });
  });
});
