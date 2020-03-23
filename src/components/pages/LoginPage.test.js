import React, {Component} from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import LoginPage from './LoginPage';

Enzyme.configure({ adapter: new Adapter() });

/////////////////////////

test('LoginPage',()=>{
    expect(LoginPage).toBeDefined();
});

/////////////////////////

test('Render Correct',()=>{
    const login = shallow(<LoginPage/>);
    expect(login).toMatchSnapshot();
});

/////////////////////////

test('Test Empty Login props',()=>{
    const login = <LoginPage/>;
    expect(login.props).toStrictEqual({});
});

////////////////////////

test('Test Render BurgerMenu', () => {
    const mockLogout = jest.fn();
    const login = mount(<LoginPage/>);
    const menu =  login.find('BurgerMenu');
    
    
   
    expect(menu).toBeDefined();
});

////////////////////////

test('Test Render Login', () => {
    const mockLogout = jest.fn();
    const login = mount(<LoginPage/>);
    const button =  login.find('Login');
    
    expect(button).toBeDefined();
});

//////////////////////////

