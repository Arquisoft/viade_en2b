import React, {Component} from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import AboutPage from './AboutPage';

Enzyme.configure({ adapter: new Adapter() });

/////////////////////////

test('AboutPage',()=>{
    expect(AboutPage).toBeDefined();
});

/////////////////////////

test('Render Correct',()=>{
    const page = mount(<AboutPage/>);
    expect(page).toMatchSnapshot();
});

/////////////////////////

test('Render about is Correct',()=>{
    const main = mount(<AboutPage/>);
    expect(main.find('.about')).toBeDefined();
});

/////////////////////////

test('Render HamburgerMenu is Correct',()=>{
    const main = mount(<AboutPage/>);
    expect(main.find('BurgerMenu').exists()).toBe(true);
});

////////////////////////

test('Section Developrs',()=>{
    const main = mount(<AboutPage/>);
    expect(main.find('sectionDevelopers')).exists()).toBe(true);
});
