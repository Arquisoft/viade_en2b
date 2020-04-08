import React, {Component} from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import Dropzone from './Dropzone';

Enzyme.configure({ adapter: new Adapter() });

/////////////////////////

test('Dropzone',()=>{
    expect(Dropzone).toBeDefined();
});

test('Click Correct',()=>{
    const mockFunc = jest.fn();
    
    const dropzone = mount(<Dropzone onFilesAdded={mockFunc}/>);
    const input = dropzone.find('input');
    input.simulate('change');
    

    expect(mockFunc).toHaveBeenCalled();

});
