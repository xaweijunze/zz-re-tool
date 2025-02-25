import { StrictMode } from 'react';
import { renderHook } from '@testing-library/react-hooks';

export * from '@testing-library/react-hooks';

const Wrapper = process.env.REACT_MODE === 'strict' ? StrictMode : undefined;

const customRender: typeof renderHook = (ui, options) =>
  renderHook(ui, { wrapper: Wrapper, ...options });

export { customRender as renderHook };
