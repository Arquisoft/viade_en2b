import * as FileGateway from "./FileGateway";
import * as FileUpload from "../FileManager/FileUpload";
import * as FileLink from "../FileManager/FileLink";

const mockGatewayLink = jest.spyOn(FileLink, "linkFilesToRoute");
const mockGatewayUpload = jest.spyOn(FileUpload, "uploadFiles");

mockGatewayLink.mockImplementation(async (fileList, routePath) => {});
mockGatewayUpload.mockImplementation(async (fileList) => {
  return fileList.map((file) => `path/${file.name}`);
});

var dummyRoute1 = {
  name: "route1",
  points: [
    { lat: 0, long: 0 },
    { lat: 1, long: 1 },
  ],
};

var dummyFileList = [
  { name: "file1.png" },
  { name: "file2.jpg" },
  { name: "file3.avi" },
];

var dummyFilePathList = ["path/file1.png", "path/file2.jpg", "path/file3.avi"];

test("upload files and link them to a route", async () => {
  let paths = await FileGateway.uploadFiles(dummyRoute1.name, [
    ...dummyFileList,
  ]);

  expect(paths).toEqual([...dummyFilePathList]);
});
