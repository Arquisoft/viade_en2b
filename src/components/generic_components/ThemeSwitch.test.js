import React, {Component} from 'react';
import ThemeSwitch from './ThemeSwitch';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';

import ConfigCache from 'caches/ConfigCache.js'

Enzyme.configure({ adapter: new Adapter() });

test('ThemeSwitch',()=>{
  const temp = mount(<ThemeSwitch/>);
  expect(temp).toBeDefined();
});

test("RenderSwitch", ()=>{
  const temp = shallow(<ThemeSwitch/>);
  expect(temp).toMatchSnapshot();
});

test("SwitchDefault", () => {
  const temp = mount(<ThemeSwitch/>);
  expect(temp.find(".theme-switch").at(0).props().checked).toBeFalsy();
});

test("SwitchToggle", () => {
  const temp = mount(<ThemeSwitch/>);
  temp.find(".theme-switch").at(0).simulate('click');
  expect(ConfigCache.dark).toBeTruthy();
});

test("SwitchToggleTwice", () => {
  const temp = mount(<ThemeSwitch/>);
  temp.find(".theme-switch").at(0).simulate('click');
  temp.find(".theme-switch").at(0).simulate('click');
  expect(ConfigCache.dark).toBeFalsy();
});
