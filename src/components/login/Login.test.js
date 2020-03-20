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

test('Not Session Correct',()=>{
   const event = { preventDefault: () => {} };
   const open = window.open;
   const spyNotWare = jest.spyOn(event,'preventDefault')
    const login = mount(<Login/>);
    const submit = login.find('LoggedOut').find('.login100-form-btn');
 
    submit.simulate('click');

    expect(submit.exists()).toBeTruthy();

});
