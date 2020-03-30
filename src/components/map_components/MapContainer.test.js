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
test('isContainerMapNotNull', ()=>{
    const main = mount(<MapContainer/>);
    
    expect(main).not.toBeNull();
});

test('stringRutaNotNull', ()=>{
    const main = mount(<MapContainer/>);

    expect(main.props.stringRuta).not.toBeNull();
});


test('rutaSeleccionadaNotNull', ()=>{
    const main = mount(<MapContainer/>);

    expect(main.props.rutaSeleccionada).not.toBeNull();
});

test('routeNotNull', ()=>{
    const main = mount(<MapContainer/>);

    expect(main.props.route).not.toBeNull();
});

test('Zoom False',()=>{
    const maps = mount(<MapContainer/>);
    const submit = maps.find('Map');
    expect(maps.props.zoomControl).toBeFalsy();

})

test('polylineIsNotNull', ()=>{
    const main = mount(<MapContainer/>);
    expect(main.find('Polyline')).not.toBeNull();
});

test('markerIsNotNull', ()=>{
    const main = mount(<MapContainer/>);
    expect(main.find('Marker')).not.toBeNull();
});

test('mapIsNotNull', ()=>{
    const main = mount(<MapContainer/>);
    expect(main.find('Map')).not.toBeNull();
});