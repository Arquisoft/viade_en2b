import * as FileUtils from "./FileUtils";

test("handle response", () => {
  let blob = new Blob();
  let options = { status: 401, statusText: "My error." };
  let response = new Response(blob, options);
  response.url = "http://example.org/myurl";
  FileUtils.handleFetchError(response).catch((err) => {
    expect(err.message).toEqual(
      "The ressource at http://example.org/myurl requires you to login."
    );
  });
});

test("handle error", () => {
  let error = new Error("My error.");
  FileUtils.handleFetchError(error).catch((err) => {
    expect(err.message).toEqual("My error.");
  });
});

test("handle string message", () => {
  let error = "My error.";
  FileUtils.handleFetchError(error).catch((err) => {
    expect(err.message).toEqual("My error.");
  });
});

test("handle object", () => {
  let error = {
    message: "My error",
  };
  FileUtils.handleFetchError(error).catch((err) => {
    expect(err.message).toEqual(JSON.stringify(error));
  });
});
