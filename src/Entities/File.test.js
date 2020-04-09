import File from "./File";

describe("new objects are created as expected", () => {
  test("image file", () => {
      let date = new Date().toISOString();
      let file = new File("image.png", date);

      expect(file.filePath).toEqual("image.png");
      expect(file.contentType).toEqual("image/png");
      expect(file.dateAttached).toEqual(new Date(date));
  });

  test("video file", () => {
    let date = new Date().toISOString();
    let file = new File("video.avi", date);

    expect(file.filePath).toEqual("video.avi");
    expect(file.contentType).toEqual("video/x-msvideo");
    expect(file.dateAttached).toEqual(new Date(date));
});
});
