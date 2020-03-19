import React, {Component} from 'react';
import MapContainer from "./MapContainer";
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import {expects} from "rdf-namespaces/dist/hydra";



Enzyme.configure({ adapter: new Adapter() });

test('isDefined', ()=>{
    expect(<MapContainer/>).toBeDefined();
});


//ToChange
/*
test('TestExistance of button', () => {
    const mockLogout = jest.fn();
    const button = <GenericButton onClick={mockLogout}/>
    const wrapper = shallow(button);

    wrapper.simulate('click');
    expect(mockLogout).toHaveBeenCalled();
});
*/  