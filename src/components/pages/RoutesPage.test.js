import React, {Component} from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import RoutesPage from './RoutesPage';

Enzyme.configure({ adapter: new Adapter() });

/////////////////////////

test('RoutesPage',()=>{
    expect(RoutesPage).toBeDefined();
});

/////////////////////////

test('Render Correct',()=>{
    const routes = mount(<RoutesPage/>);
    expect(routes).toMatchSnapshot();
});

/////////////////////////

test('Check No Route Link',()=>{
    const routes = mount(<RoutesPage/>);
    routes.rutas = [];
    expect(routes.find(".linkRoute").exists()).toBeFalsy();
});

/////////////////////////

test('Check Route Link',()=>{
    const routes = mount(<RoutesPage/>);
    const rutaJSON = '{	"name" : "Oviedo","itinerary" :[{"@type" : "GeoCoordinates", "latitude" : "43.362070", "longitude" : "-5.846307" },{"@type" : "GeoCoordinates",	"latitude" : "43.361778","longitude" : "-5.848008"}] }';
    routes.rutas = (JSON.parse(rutaJSON));
    expect(routes.rutas).not.toBeUndefined();
});

/////////////////////////

test('Check Route not null',()=>{
    const routes = mount(<RoutesPage/>);
    const rutaJSON = '{	"name" : "Oviedo","itinerary" :[{"@type" : "GeoCoordinates", "latitude" : "43.362070", "longitude" : "-5.846307" },{"@type" : "GeoCoordinates",	"latitude" : "43.361778","longitude" : "-5.848008"}] }';
    routes.rutas = (JSON.parse(rutaJSON));
    expect(routes.rutas).not.toBeNull();
});
/*
test('Linking menu',()=>{
  
    const routes = mount(<RoutesPage/>);
    const link = routes.find('Link')
    
    link.at(6).simulate('click');

    expect(link.exists()).toBeTruthy();

});

test('Check Route listing',()=>{
    const rutaJSON = '{	"name" : "Oviedo","itinerary" :[{"@type" : "GeoCoordinates", "latitude" : "43.362070", "longitude" : "-5.846307" },{"@type" : "GeoCoordinates",	"latitude" : "43.361778","longitude" : "-5.848008"}] }';
    var rutas = [];
    rutas.push((JSON.parse(rutaJSON)));

    const routes = mount(<RoutesPage defaultRuta={rutas}/>);
    
    expect(routes.rutas).not.toBeNull();

    const ruta = routes.find('#route0')
    ruta.simulate('click');
    expect(ruta.exists()).toBeTruthy();


});

test('Button of Route',()=>{
        const rutaJSON = '{	"name" : "Oviedo","itinerary" :[{"@type" : "GeoCoordinates", "latitude" : "43.362070", "longitude" : "-5.846307" },{"@type" : "GeoCoordinates",	"latitude" : "43.361778","longitude" : "-5.848008"}] }';
    var rutas = [];
    rutas.push((JSON.parse(rutaJSON)));

    const routes = mount(<RoutesPage defaultRuta={rutas}/>);
    
    expect(routes.rutas).not.toBeNull();

    const ruta = routes.find('#route0')
    ruta.simulate('click');
    expect(ruta.exists()).toBeTruthy();

    const link = ruta.find('Link');

    link.simulate('click');

    expect(localStorage.getItem('route')).not.toBe("")
});*/