import React, {Component} from "react";
import SearchBar from "./SearchBar";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";

Enzyme.configure({ adapter: new Adapter() });


test("SearchBar",()=>{
    const bar = mount(<SearchBar/>);
    expect(bar).toBeDefined();
});
