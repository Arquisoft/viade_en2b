import React, {Component} from 'react';
import getStyle from "./MapStyles.js";
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import {expects} from "rdf-namespaces/dist/hydra";



test('isCorreclyCalled', ()=>{
    const test = getStyle(1);
    expect(getStyle(1)).haveBeenCalled;
});

test('isCorreclyCalledWhen0Passed', ()=>{
    const test = getStyle(0);
    expect(test).not.toBe("");
});

test('isCorreclyCalledWhen0NotPassed', ()=>{
    const test = getStyle(1);
    expect(test).not.toBe("");
});

