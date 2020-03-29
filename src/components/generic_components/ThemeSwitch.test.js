import React, {Component} from 'react';
import ThemeSwitch from './ThemeSwitch';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });


test('ThemeSwitch',()=>{
    const switch = mount(<ThemeSwitch/>);
    expect(switch).toBeDefined();
});
