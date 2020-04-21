import React, {Component} from "react";
import MyTab from "./MyTab";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

test("Definition",()=>{
    expect(MyTab).toBeDefined();
});

/////////////////////////

test("Render Correct",()=>{
    const mytab = (<MyTab route={{name:"ruta"}}/>);
    expect(mytab).toMatchSnapshot();
});

/////////////////////////

test("Test Empty Prop",()=>{
    const mytab = (<MyTab route={{name:"ruta"}}/>);
    expect(mytab.props.message).toBeUndefined();
});


/////////////////////////

test("Test Seen all",()=>{
    const mytab = mount(<MyTab route={{name:"ruta"}}/>);
    const element = mytab.find("InfiniteScroll");
    expect(element.exists).toBeTruthy();
});

