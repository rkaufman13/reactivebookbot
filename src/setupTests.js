// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import React from 'react';
import renderer from 'react-test-renderer';
import App from './App.js';

describe('Rendering', () => {
const component=renderer.create(<App/>);

}
);

