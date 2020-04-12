import React, {Component} from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import RouteDetails from './RouteDetails';

Enzyme.configure({ adapter: new Adapter() });

/////////////////////////

test('RouteDetails',()=>{
    expect(RouteDetails).toBeDefined();
});

/////////////////////////

test('Render Correct',()=>{
    const main = mount(<RouteDetails/>);
    expect(main).toMatchSnapshot();
});

