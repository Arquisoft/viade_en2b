import React, {Component} from 'react';
import MapRoute from "./MapContainer";
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import {expects} from "rdf-namespaces/dist/hydra";


test('isDefined', ()=>{
    expect(<MapRoute/>).toBeDefined();
});

test('theObjectIsCreated', ()=>{
    let route = new MapRoute(); 
    //expect(route).not.toBeNull();
    expect(<MapRoute/>).not.toBeNull();
});


test('theRenderMethodIsCalled', ()=>{
    let route = new MapRoute(); 
    mount MapRoute();
    //expect(route).not.toBeNull();
    expect(route.render()).toHaveReturned();
});