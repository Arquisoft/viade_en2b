import React, {Component} from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import MainPage from './MainPage';

Enzyme.configure({ adapter: new Adapter() });

/////////////////////////

test('MainPage',()=>{
    expect(MainPage).toBeDefined();
});

/////////////////////////

test('Render Correct',()=>{
    const main = shallow(<MainPage/>);
    expect(main).toMatchSnapshot();
});