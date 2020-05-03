import React, {Component} from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import NotificationsPage from './NotificationsPage';

Enzyme.configure({ adapter: new Adapter() });

/////////////////////////

test('NotificationsPage',()=>{
    expect(NotificationsPage).toBeDefined();
});

/////////////////////////

test('Render Correct',()=>{
    const main = mount(<NotificationsPage/>);
    expect(main).toMatchSnapshot();
});

/////////////////////////

test('Render HamburgerMenu is Correct',()=>{
    const main = mount(<NotificationsPage/>);

    expect(main.find('BurgerMenu').exists()).toBe(true);
});

/////////////////////////

test('Render List is Correct',()=>{
    const main = mount(<NotificationsPage/>);

    expect(main.find('FloatingButton').exists()).toBe(false);
    expect(main.find('.listComment').exists()).toBe(true);
});


test('BurgerMenu change view',()=>{
    const main = mount(<NotificationsPage/>);

    const sideMenu = main.find('BurgerMenu');

    expect(sideMenu.find('#list-routes').at(1).props().href).toBe("#/routes");
});