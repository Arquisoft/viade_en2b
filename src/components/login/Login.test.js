import React, {Component} from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import Login from './Login';

Enzyme.configure({ adapter: new Adapter() });

/////////////////////////

test('Login',()=>{
    expect(Login).toBeDefined();
});

/////////////////////////

test('Render Correct',()=>{
    const button = shallow(<Login/>);
    expect(button).toMatchSnapshot();
});

////////////////////////

