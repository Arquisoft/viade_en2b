import FileCache from "./FileCache";
import RouteCache from "../routeCache/RouteCache";
import * as FileGateway from "data-access/gateways/FileGateway";

const mockGatewayUpload = jest.spyOn(FileGateway, "uploadFiles");
const mockGatewayRemove = jest.spyOn(FileGateway, "removeFileAttached");

mockGatewayUpload.mockImplementation(async (routePath, fileList) => {
  return fileList.map(file => `path/${file.name}`);
});

var dummyRoute1 = {
  name: "route1",
  points: [
    { lat: 0, long: 0 },
    { lat: 1, long: 1 }
  ]
};

var dummyRoute2 = {
  name: "route2",
  points: [
    { lat: 0, long: 0 },
    { lat: 1, long: 1 }
  ]
};

var dummyFileList = [
  { name: "file1.png" },
  { name: "file2.jpg" },
  { name: "file3.avi" }
];

var dummyFilePathList = ["path/file1.png", "path/file2.jpg", "path/file3.avi"];

beforeEach(() => {
  FileCache.filePaths = [];
  RouteCache.routes = [dummyRoute1, dummyRoute2];
  RouteCache.selected = null;
  mockGatewayUpload.mockClear();
  mockGatewayRemove.mockClear();
});

test("add files not in the cache", async () => {
  RouteCache.setSelected(dummyRoute1);
  await FileCache.addFiles(dummyFileList);
  RouteCache.setSelected(dummyRoute2);
  await FileCache.addFiles(dummyFileList);

  expect(mockGatewayUpload).toHaveBeenCalled();
  expect(FileCache.filePaths.length).toBe(2);
  expect(FileCache.filePaths[0].routePath).toEqual(dummyRoute1.name);
  expect(FileCache.filePaths[1].routePath).toEqual(dummyRoute2.name);
  expect(FileCache.filePaths[0].files).toEqual(dummyFilePathList);
  expect(FileCache.filePaths[1].files).toEqual(dummyFilePathList);
});

test("add files in the cache", async () => {
  RouteCache.setSelected(dummyRoute1);
  await FileCache.addFiles(dummyFileList);
  await FileCache.addFiles(dummyFileList);

  expect(mockGatewayUpload).toHaveBeenCalled();
  expect(FileCache.filePaths.length).toBe(1);
  expect(FileCache.filePaths[0].routePath).toEqual(dummyRoute1.name);
  expect(FileCache.filePaths[0].files).toEqual(dummyFilePathList);
});
