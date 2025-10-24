import { describe, it, expect } from 'vitest';
import { dummyMenus } from './dummyData';

describe('dummyMenus', () => {
  it('should be an object', () => {
    expect(typeof dummyMenus).toBe('object');
  });

  it('should contain menu data for all restaurants', () => {
    expect(dummyMenus['pizza-hut']).toBeDefined();
    expect(dummyMenus['burger-king']).toBeDefined();
    expect(dummyMenus['dominos']).toBeDefined();
    expect(dummyMenus['sushi-place']).toBeDefined();
  });

  it('should have arrays for each restaurant menu', () => {
    Object.values(dummyMenus).forEach(menu => {
      expect(Array.isArray(menu)).toBe(true);
    });
  });

  it('should have valid menu items with required properties', () => {
    Object.values(dummyMenus).forEach(menu => {
      menu.forEach(item => {
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('description');
        expect(item).toHaveProperty('price');
        expect(typeof item.name).toBe('string');
        expect(typeof item.description).toBe('string');
        expect(typeof item.price).toBe('number');
      });
    });
  });

  it('should have non-empty menus for each restaurant', () => {
    expect(dummyMenus['pizza-hut'].length).toBeGreaterThan(0);
    expect(dummyMenus['burger-king'].length).toBeGreaterThan(0);
    expect(dummyMenus['dominos'].length).toBeGreaterThan(0);
    expect(dummyMenus['sushi-place'].length).toBeGreaterThan(0);
  });

  it('should have positive prices for all menu items', () => {
    Object.values(dummyMenus).forEach(menu => {
      menu.forEach(item => {
        expect(item.price).toBeGreaterThan(0);
      });
    });
  });
});
