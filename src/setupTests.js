// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import React from 'react';
import renderer from 'react-test-renderer';
import App from './App.js';

test('Rendering', ()=>{
const component=renderer.create(<App/>);
it('has a button that says \'Time Machine\' on it', ()=> {

}
)

}
)

describe('Addition', () => {
    it('knows that 2 and 2 make 4', () => {
      expect(2 + 2).toBe(4);
    });
  });