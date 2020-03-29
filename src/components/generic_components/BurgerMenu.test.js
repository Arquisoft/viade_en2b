import React, {Component} from 'react';
import BurgerMenu from './BurgerMenu';
import Enzyme, {shallow, mount} from "enzyme"
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});


test("DefineHamburger", ()=>{
    expect(BurgerMenu).toBeDefined();
});


test("RenderHamburger", ()=>{
    const temp = shallow(<BurgerMenu/>);
    expect(temp).toMatchSnapshot();
});


test("propsHamburgerEmptyPageWrap", ()=>{
    const temp = <BurgerMenu/>;
    expect(temp.props.pageWrapId).toBe(undefined);
});


test("propsHamburguerPageWrap", ()=>{
    const temp = <BurgerMenu 
        pageWrapId="page-wrap"
      />;
    expect(temp.props.pageWrapId).toBe("page-wrap");
});


test("propsHamburguerOuterContainer", ()=>{
    const temp = <BurgerMenu 
        container="outer-container"
      />;
    expect(temp.props.container).toBe("outer-container");
});


test("propsHamburguerAllProps", ()=>{
    const temp = <BurgerMenu
        pageWrapId="page-wrap"
        container="outer-container"
      />;
      expect(temp.props.pageWrapId).toBe("page-wrap");
      expect(temp.props.container).toBe("outer-container");
});


 test("HamburguerInexistentLink", () => {
  const temp = shallow(<BurgerMenu/>);
  expect(temp.find("#inexistentLink").exists()).toBe(false);
 });


test("HamburguerDefinedHome", () => {
  const temp = mount(<BurgerMenu/>);
  expect(temp.find("#home")).toBeDefined();
 });


test("HamburguerDefinedAddRoute", () => {
  const temp = mount(<BurgerMenu/>);
  expect(temp.find("#add-route")).toBeDefined();
 });


test("HamburguerDefinedListRoutes", () => {
  const temp = mount(<BurgerMenu/>);
  expect(temp.find("#list-routes")).toBeDefined();
 });


test("HamburguerDefinedListFriends", () => {
  const temp = mount(<BurgerMenu/>);
  expect(temp.find("#list-friends")).toBeDefined();
 });


test("HamburguerDefinedabout", () => {
  const temp = mount(<BurgerMenu/>);
  expect(temp.find("#about")).toBeDefined();
 });


test("HamburguerDefinedContact", () => {
  const temp = mount(<BurgerMenu/>);
  expect(temp.find("#contact")).toBeDefined();
 });


test("HamburguerDefinedSettings", () => {
  const temp = mount(<BurgerMenu/>);
  expect(temp.find("#settings")).toBeDefined();
 });


test("HamburguerClickHome", () => {
  const temp = mount(<BurgerMenu/>);
  expect(temp.find("#home").at(1).props().href).toBe("#/");
 });


test("HamburguerClickListRoutes", () => {
  const temp = mount(<BurgerMenu/>);
  expect(temp.find("#list-routes").at(1).props().href).toBe("#/routes");
 });


test("HamburguerClickAbout", () => {
  const temp = mount(<BurgerMenu/>);
  expect(temp.find("#about").at(1).props().href).toBe("#/");
 });
