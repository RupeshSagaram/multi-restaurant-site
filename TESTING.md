# Testing Guide

## Overview

This project uses [Vitest](https://vitest.dev/) as the testing framework along with [React Testing Library](https://testing-library.com/react) for component testing. The test suite includes comprehensive unit tests for components, custom hooks, and integration tests for pages and routing.

## Quick Start

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests in watch mode (recommended for development)
npm test -- --watch

# Generate coverage report
npm run test:coverage

# Run tests with UI (interactive browser UI)
npm run test:ui
```

## Test Structure

### Directory Organization

```
src/
├── components/
│   ├── Button.jsx
│   ├── Button.test.jsx
│   ├── MenuItem.jsx
│   ├── MenuItem.test.jsx
│   └── ...
├── pages/
│   ├── HomePage.jsx
│   ├── HomePage.test.jsx
│   └── ...
├── logic/
│   ├── useAuth.js
│   ├── useAuth.test.js
│   └── ...
├── constants/
│   ├── restaurants.js
│   ├── restaurants.test.js
│   └── ...
└── test/
    └── setup.js
```

### Test Files

- Test files are co-located with source files
- Use `.test.js` or `.test.jsx` extension
- Follow the naming pattern: `ComponentName.test.jsx` or `fileName.test.js`

## Writing Tests

### Basic Component Test

```javascript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Testing User Interactions

```javascript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button interactions', () => {
  it('should call onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Testing Custom Hooks

```javascript
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMyHook } from './useMyHook';

describe('useMyHook', () => {
  it('should update state correctly', () => {
    const { result } = renderHook(() => useMyHook());
    
    act(() => {
      result.current.updateValue('new value');
    });
    
    expect(result.current.value).toBe('new value');
  });
});
```

### Testing Components with React Router

```javascript
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import MyPage from './MyPage';

const renderWithRouter = (initialRoute) => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/:param" element={<MyPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('MyPage', () => {
  it('should render with route param', () => {
    renderWithRouter('/test-param');
    expect(screen.getByText('test param')).toBeInTheDocument();
  });
});
```

## Testing Best Practices

### 1. Test User Behavior, Not Implementation

❌ Bad:
```javascript
expect(component.state.isOpen).toBe(true);
```

✅ Good:
```javascript
expect(screen.getByRole('dialog')).toBeVisible();
```

### 2. Use Accessible Queries

Prefer queries in this order:
1. `getByRole` - Best for accessibility
2. `getByLabelText` - Good for form fields
3. `getByPlaceholderText` - Useful for inputs
4. `getByText` - For non-interactive content
5. `getByTestId` - Last resort

### 3. Async Operations

Always await user interactions:
```javascript
const user = userEvent.setup();
await user.click(button);
await user.type(input, 'text');
```

### 4. Test Isolation

Each test should be independent:
```javascript
// ✅ Good - cleanup happens automatically via setup.js
describe('MyComponent', () => {
  it('test 1', () => { /* ... */ });
  it('test 2', () => { /* ... */ }); // Fresh render, no interference
});
```

### 5. Descriptive Test Names

```javascript
// ❌ Bad
it('works', () => { /* ... */ });

// ✅ Good
it('should display error message when form is submitted without email', () => {
  /* ... */
});
```

## Common Testing Patterns

### Testing Forms

```javascript
it('should submit form with valid data', async () => {
  const user = userEvent.setup();
  const handleSubmit = vi.fn();
  
  render(<Form onSubmit={handleSubmit} />);
  
  await user.type(screen.getByLabelText('Email'), 'test@example.com');
  await user.click(screen.getByRole('button', { name: 'Submit' }));
  
  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'test@example.com'
  });
});
```

### Testing Conditional Rendering

```javascript
it('should show loading state', () => {
  render(<Component isLoading={true} />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

it('should show content when loaded', () => {
  render(<Component isLoading={false} data={mockData} />);
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  expect(screen.getByText('Content')).toBeInTheDocument();
});
```

### Testing Lists

```javascript
it('should render all items', () => {
  const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
  ];
  
  render(<List items={items} />);
  
  items.forEach(item => {
    expect(screen.getByText(item.name)).toBeInTheDocument();
  });
});
```

## Mocking

### Mocking Functions

```javascript
import { vi } from 'vitest';

const mockFn = vi.fn();
mockFn.mockReturnValue('mocked value');
mockFn.mockResolvedValue('async value');
```

### Mocking Modules

```javascript
vi.mock('./utils', () => ({
  formatDate: vi.fn(() => '2024-01-01')
}));
```

## Coverage Reports

### Viewing Coverage

After running `npm run test:coverage`:

1. **Terminal Output**: Shows coverage summary
2. **HTML Report**: Open `coverage/index.html` in a browser
3. **JSON Report**: Available at `coverage/coverage-final.json`

### Coverage Goals

- **Statements**: > 80%
- **Branches**: > 80%
- **Functions**: > 80%
- **Lines**: > 80%

Current Coverage: **94.11%** overall ✅

## Continuous Integration

Tests automatically run in CI/CD pipelines. Ensure all tests pass before merging:

```bash
# Run tests once (CI mode)
npm test -- --run
```

## Debugging Tests

### Run Specific Test File

```bash
npm test -- Button.test.jsx
```

### Run Tests Matching Pattern

```bash
npm test -- --grep "should render"
```

### Debug in VS Code

Add to `.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Tests",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["test"],
  "console": "integratedTerminal"
}
```

### Using console.log in Tests

```javascript
it('debugging test', () => {
  render(<Component />);
  screen.debug(); // Prints current DOM
  console.log(screen.getByRole('button')); // Log specific element
});
```

## Troubleshooting

### Test Fails Intermittently

- Issue: Race condition or timing issue
- Solution: Ensure all async operations are awaited

```javascript
// Use waitFor for elements that appear asynchronously
import { waitFor } from '@testing-library/react';

await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});
```

### "Not wrapped in act(...)" Warning

- Issue: State update outside act
- Solution: Use `act` for state updates or ensure user events are awaited

```javascript
import { act } from '@testing-library/react';

act(() => {
  result.current.updateState();
});
```

### Cannot Find Element

- Issue: Using wrong query or element not rendered
- Solution: Use `screen.debug()` to see current DOM

```javascript
render(<Component />);
screen.debug(); // See what's actually rendered
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Contributing

When adding new features:

1. Write tests first (TDD approach) or immediately after
2. Aim for at least 80% coverage for new code
3. Follow existing test patterns and conventions
4. Run `npm run test:coverage` before submitting PR
5. Ensure all tests pass: `npm test -- --run`
