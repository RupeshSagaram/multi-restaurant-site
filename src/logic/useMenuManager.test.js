import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMenuManager } from './useMenuManager';

describe('useMenuManager hook', () => {
  it('should initialize with empty menu for unknown restaurant', () => {
    const { result } = renderHook(() => useMenuManager('unknown-restaurant'));
    expect(result.current.menu).toEqual([]);
  });

  it('should initialize with existing menu for known restaurant', () => {
    const { result } = renderHook(() => useMenuManager('pizza-hut'));
    expect(result.current.menu.length).toBeGreaterThan(0);
    expect(result.current.menu[0]).toHaveProperty('name');
    expect(result.current.menu[0]).toHaveProperty('description');
    expect(result.current.menu[0]).toHaveProperty('price');
  });

  it('should provide menu and addMenuItem function', () => {
    const { result } = renderHook(() => useMenuManager('pizza-hut'));
    expect(result.current).toHaveProperty('menu');
    expect(result.current).toHaveProperty('addMenuItem');
    expect(typeof result.current.addMenuItem).toBe('function');
  });

  it('should add a new menu item', () => {
    const { result } = renderHook(() => useMenuManager('pizza-hut'));
    const initialLength = result.current.menu.length;
    
    const newItem = {
      name: 'Test Item',
      description: 'Test Description',
      price: 10
    };

    act(() => {
      result.current.addMenuItem(newItem);
    });

    expect(result.current.menu.length).toBe(initialLength + 1);
    expect(result.current.menu[result.current.menu.length - 1]).toEqual(newItem);
  });

  it('should add multiple menu items', () => {
    const { result } = renderHook(() => useMenuManager('burger-king'));
    const initialLength = result.current.menu.length;
    
    const item1 = { name: 'Item 1', description: 'Desc 1', price: 5 };
    const item2 = { name: 'Item 2', description: 'Desc 2', price: 8 };

    act(() => {
      result.current.addMenuItem(item1);
      result.current.addMenuItem(item2);
    });

    expect(result.current.menu.length).toBe(initialLength + 2);
    expect(result.current.menu[result.current.menu.length - 2]).toEqual(item1);
    expect(result.current.menu[result.current.menu.length - 1]).toEqual(item2);
  });

  it('should maintain menu state independently for different restaurants', () => {
    const { result: result1 } = renderHook(() => useMenuManager('pizza-hut'));
    const { result: result2 } = renderHook(() => useMenuManager('dominos'));

    const initialLength1 = result1.current.menu.length;
    const initialLength2 = result2.current.menu.length;

    const newItem = { name: 'New Item', description: 'New Desc', price: 12 };

    act(() => {
      result1.current.addMenuItem(newItem);
    });

    // Only result1 should change
    expect(result1.current.menu.length).toBe(initialLength1 + 1);
    expect(result2.current.menu.length).toBe(initialLength2);
  });

  it('should preserve existing menu items when adding new ones', () => {
    const { result } = renderHook(() => useMenuManager('sushi-place'));
    const originalFirstItem = result.current.menu[0];
    
    const newItem = { name: 'Dragon Roll', description: 'Special roll', price: 15 };

    act(() => {
      result.current.addMenuItem(newItem);
    });

    // First item should still be the same
    expect(result.current.menu[0]).toEqual(originalFirstItem);
  });
});
