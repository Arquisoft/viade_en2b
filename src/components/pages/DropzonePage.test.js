import React, {Component} from 'react';
import DropzonePage from './DropzonePage';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

test('DropzonePage',()=>{
    expect(DropzonePage).toBeDefined();
});

test('Dropzone upload',()=>{
    const dropzonePage = mount(<DropzonePage onUpload={console.log}/>);
    const dropzone = dropzonePage.find('Dropzone');
    
    //dropzone.setState(files: ["Uno"]);
    expect(dropzonePage.exists).toBeTruthy();
    expect(dropzone.exists).toBeTruthy();
} )

