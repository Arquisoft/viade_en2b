import React, { Component } from "react";
import MapContainer from "./MapContainer";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";
import { expects } from "rdf-namespaces/dist/hydra";

Enzyme.configure({ adapter: new Adapter() });

test("isDefined", () => {
  expect(<MapContainer />).toBeDefined();
});
test("isContainerMapNotNull", () => {
  const main = mount(<MapContainer />);

  expect(main).not.toBeNull();
});

test("stringRutaNotNull", () => {
  const main = mount(<MapContainer />);

  expect(main.props.stringRuta).not.toBeNull();
});

test("rutaSeleccionadaNotNull", () => {
  const main = mount(<MapContainer />);

  expect(main.props.rutaSeleccionada).not.toBeNull();
});

test("routeNotNull", () => {
  const main = mount(<MapContainer />);

  expect(main.props.route).not.toBeNull();
});

test("Test properties map", () => {
  const maps = mount(<MapContainer />);
  maps.zoom = 15;
  maps.center = [];
  maps.route = [];
  const submit = maps.find("Map");

  expect(maps.props.zoomControl).toBeFalsy();
  expect(maps.zoom).toBe(15);
  expect(maps.center).toStrictEqual([]);
  expect(maps.route).toStrictEqual([]);
});

test("polylineIsNotNull", () => {
  const main = mount(<MapContainer />);

  expect(main.find("Polyline")).not.toBeNull();
});

test("markerIsNotNull", () => {
  const main = mount(<MapContainer />);
  expect(main.find("Marker")).not.toBeNull();
});

test("mapIsNotNull", () => {
  const main = mount(<MapContainer />);
  expect(main.find("Map")).not.toBeNull();
});
