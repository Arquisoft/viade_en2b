import React, {Component} from 'react';
import ConfigCache from 'caches/ConfigCache.js';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';

test('ThemeDefault',()=>{
    expect(ConfigCache.dark).toBeFalsy();
});

test('ThemeToggle',()=>{
    ConfigCache.switchTheme();
    expect(ConfigCache.dark).toBeTruthy();
});
