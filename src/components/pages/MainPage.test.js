import React, {Component} from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import MainPage from './MainPage';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
    push: jest.fn()
  })
}));

/////////////////////////

test('MainPage',()=>{
    expect(MainPage).toBeDefined();
});



/////////////////////////

test('Render Map is Correct',()=>{
    const main = mount(<MainPage/>);

    expect(main.find('MapContainer')).toBeDefined();
});

/////////////////////////

test('Render HamburgerMenu is Correct',()=>{
    const main = mount(<MainPage/>);

    expect(main.find('BurgerMenu').exists()).toBe(true);
});

/////////////////////////

test('Render FloatingButton is Correct',()=>{
    const main = mount(<MainPage/>);

    expect(main.find('FloatingButton').exists()).toBe(true);
});

////////////////////////

test('Login redirect Button',()=>{
    const main = mount(<MainPage/>);

    expect(main.find('GenericButton').props('message').to).not.toBe("");
});

////////////////////////
/*
test('',()=>{
    const main = shallow(<MainPage/>);
    const login = main.find('GenericButton');
   
    login.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
});*/
///////////////////////

test('BurgerMenu change view',()=>{
    const main = mount(<MainPage/>);

    const sideMenu = main.find('BurgerMenu');

    expect(sideMenu.find('#list-routes').at(1).props().href).toBe("#/routes");
});