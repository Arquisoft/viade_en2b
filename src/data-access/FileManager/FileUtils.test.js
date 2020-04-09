import * as FileUtils from "./FileUtils";

test("", () => {
  let blob = new Blob();
  let options = { status: 401, statusText: "My error." };
  let response = new Response(blob, options);
  response.url = "http://example.org/myurl";
  FileUtils.handleFetchError(response).catch((err) => {
    expect(err.text).toEqual(
      "The ressource at http://example.org/myurl requires you to login."
    );
  });
});
