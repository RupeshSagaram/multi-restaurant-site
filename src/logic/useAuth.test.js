import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAuth } from './useAuth';

describe('useAuth hook', () => {
  it('should initialize with isAuthenticated as false', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should provide login, logout, and isAuthenticated', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current).toHaveProperty('isAuthenticated');
    expect(result.current).toHaveProperty('login');
    expect(result.current).toHaveProperty('logout');
    expect(typeof result.current.login).toBe('function');
    expect(typeof result.current.logout).toBe('function');
  });

  it('should set isAuthenticated to true when login is called', () => {
    const { result } = renderHook(() => useAuth());
    
    act(() => {
      result.current.login();
    });

    expect(result.current.isAuthenticated).toBe(true);
  });

  it('should set isAuthenticated to false when logout is called', () => {
    const { result } = renderHook(() => useAuth());
    
    // First login
    act(() => {
      result.current.login();
    });
    expect(result.current.isAuthenticated).toBe(true);

    // Then logout
    act(() => {
      result.current.logout();
    });
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should maintain authentication state across multiple logins', () => {
    const { result } = renderHook(() => useAuth());
    
    act(() => {
      result.current.login();
    });
    expect(result.current.isAuthenticated).toBe(true);

    act(() => {
      result.current.login();
    });
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('should maintain unauthenticated state across multiple logouts', () => {
    const { result } = renderHook(() => useAuth());
    
    act(() => {
      result.current.logout();
    });
    expect(result.current.isAuthenticated).toBe(false);

    act(() => {
      result.current.logout();
    });
    expect(result.current.isAuthenticated).toBe(false);
  });
});
