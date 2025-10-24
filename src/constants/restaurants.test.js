import { describe, it, expect } from 'vitest';
import { RESTAURANTS } from './restaurants';

describe('RESTAURANTS constant', () => {
  it('should be an array', () => {
    expect(Array.isArray(RESTAURANTS)).toBe(true);
  });

  it('should contain expected restaurant names', () => {
    expect(RESTAURANTS).toEqual(['pizza-hut', 'burger-king', 'dominos', 'sushi-place']);
  });

  it('should have at least one restaurant', () => {
    expect(RESTAURANTS.length).toBeGreaterThan(0);
  });

  it('should contain only string values', () => {
    RESTAURANTS.forEach(restaurant => {
      expect(typeof restaurant).toBe('string');
    });
  });

  it('should contain unique restaurant names', () => {
    const uniqueRestaurants = new Set(RESTAURANTS);
    expect(uniqueRestaurants.size).toBe(RESTAURANTS.length);
  });
});
