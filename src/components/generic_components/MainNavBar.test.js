import React, {Component} from 'react';
import MainNavBar from './MainNavBar';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

test('MainNavBar',()=>{
    expect(MainNavBar).toBeDefined();
});

/////////////////////////

test('Render Correct',()=>{
    const bar = shallow(<MainNavBar/>);
    expect(bar).toMatchSnapshot();
});

test('NavBar company',()=>{
    const bar = <MainNavBar companyName="Viade"/>;
    
    expect(bar.props.companyName).toBe("Viade");
});


test('NavBar Button',()=>{
    const bar = mount(<MainNavBar companyName="Viade"/>);
    const button = bar.find('GenericButton');
    expect(button.props().message).toBe("Log in");
});