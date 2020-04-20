import * as FileUpload from "./FileUpload";

import * as auth from "solid-auth-client";

const mockAuth = jest.spyOn(auth, "currentSession");
mockAuth.mockImplementation(async () => {
  if (isSession) {
    return { webId: "webId/profile/card#me" };
  } else {
    return undefined;
  }
});

var dummyFileList = [
  { name: "file1.png", type: "image/png" },
  { name: "file2.jpg", type: "image/jpeg" },
  { name: "file3.avi", type: "video/x-msvideo" },
];

var dummyFilePathList = [
  "webId/viade/resources/file1.png",
  "webId/viade/resources/file2.jpg",
  "webId/viade/resources/file3.avi",
];

var isSession = true;

beforeEach(() => {
  isSession = true;
  mockAuth.mockClear();
});

test("upload files with no session", () => {
  isSession = false;
  FileUpload.uploadFiles(dummyFileList)
    .then(() => done.fail("This shouldn't happen."))
    .catch((err) => {
      expect(err.message).toEqual("You are not logged in.");
    });
});

test("upload no files", () => {
  FileUpload.uploadFiles([])
    .then(() => done.fail("This shouldn't happen."))
    .catch((err) => {
      expect(err).toEqual("No files to upload");
    });
});

test("upload files that are neither images nor videos", () => {
  FileUpload.uploadFiles([...dummyFileList, { name: "wrong.xml" }])
    .then(() => done.fail("This shouldn't happen."))
    .catch((err) => {
      expect(err).toEqual("All files must be images or videos.");
    });
});

/* test("upload files and get their respective paths", (done) => {
  let dummyBlobList = [];
  dummyFileList.forEach((file) => {
    var blob = new Blob([""], { type: file.type });
    blob["lastModifiedDate"] = "";
    blob["name"] = file.name;
    dummyBlobList.push(blob);
  });

  expect.assertions(2);
  FileUpload.uploadFiles([...dummyBlobList])
    .then((response) => {
      expect(mockUpdateFile).toHaveBeenCalledTimes(3);
      expect(response).toEqual(dummyFilePathList);
    })
    .catch(() => done.fail("This shouldn't happen."));
}); */
