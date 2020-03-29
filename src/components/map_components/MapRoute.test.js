import React, {Component} from 'react';
import MapRoute from "./MapContainer";
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import {expects} from "rdf-namespaces/dist/hydra";

Enzyme.configure({ adapter: new Adapter() });

test('isDefined', ()=>{
    expect(<MapRoute/>).toBeDefined();
});

test('theObjectIsCreated', ()=>{
    let route = new MapRoute(); 
    expect(<MapRoute/>).not.toBeNull();
});


test('theCoordsAreNotNull', ()=>{
    const main = mount(<MapRoute/>);
    expect(main.triangleCoords).not.toBeNull();
});

test('polylineIsDefined', ()=>{
    const main = mount(<MapRoute/>);
    
    expect(main.find('Polyline')).toBeDefined();
})