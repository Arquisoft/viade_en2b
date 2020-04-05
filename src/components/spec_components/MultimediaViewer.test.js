import React, {Component} from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import MultimediaViewer from './MultimediaViewer';

Enzyme.configure({ adapter: new Adapter() });

/////////////////////////

test('MultimediaViewer',()=>{
    expect(MultimediaViewer).toBeDefined();
});

test('Click Correct',()=>{
    const mockFunc = jest.fn();
    var file =new File([""], "filename2.txt", {type: "text/plain"});
    const viewer = mount(<MultimediaViewer files={[file]}/>);
    const list = viewer.find('ul');
    
    

    expect(list.exists).toBeTruthy();

});
