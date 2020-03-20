import React, {Component} from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import LoginButton from './LoginButton';

Enzyme.configure({ adapter: new Adapter() });

/////////////////////////

test('LoginButton',()=>{
    expect(LoginButton).toBeDefined();
});

/////////////////////////

test('Render Correct',()=>{
    const button = shallow(<LoginButton/>);
    expect(button).toMatchSnapshot();
});

////////////////////////

const buttonTestWhite = <LoginButton/>;
test('Test Wrong White Button',()=>{
    expect(buttonTestWhite.props.className).not.toBe("White");
});

const buttonTestBlue = <LoginButton className="Blue"/>
test('Test Wrong Blue Button',()=>{
    expect(buttonTestBlue.props.className).toBe("Blue");
});

///////////////////////

const buttonTest2 = <LoginButton message="Microsoft Office"/>

test('Test Message Button',()=>{
    expect(buttonTest2.props.message).toBe("Microsoft Office");
});

test('Test NotMessage Button',()=>{
    expect(buttonTest2.props.message).not.toBe("Macrohard Onfire");
});
