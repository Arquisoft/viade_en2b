import Comment from "./Comment";

test("instance is created correctly", () => {


    let br = new Comment("www.pod.net/viade/comments/routeComments.jsonld","This is a message",
        "https://violetaruizm.inrupt.net/profile/card#me","2020-04-27 17:00:00");

    expect(br).toBeDefined();
    expect(br.jsonComment).toBeDefined();
    expect(br.jsonComment.author).toBeDefined();
    expect(br.jsonComment.text).toBeDefined();
    expect(br.jsonComment.fileUrl).toBeDefined();
    expect(br.jsonComment.dateCreated).toBeDefined();
});
test("Url is the expected value", () => {


    let br = new Comment("www.pod.net/viade/comments/routeComments.jsonld","This is a message",
        "https://violetaruizm.inrupt.net/profile/card#me","2020-04-27 17:00:00");

    expect(br).toBeDefined();
    expect(br.jsonComment).toBeDefined();
    expect(br.jsonComment.fileUrl).toBeDefined();
    expect(br.jsonComment.fileUrl).toEqual("www.pod.net/viade/comments/routeComments.jsonld");
});
test("Author is the expected value", () => {


    let br = new Comment("www.pod.net/viade/comments/routeComments.jsonld","This is a message",
        "https://violetaruizm.inrupt.net/profile/card#me","2020-04-27 17:00:00");

    expect(br).toBeDefined();
    expect(br.jsonComment).toBeDefined();
    expect(br.jsonComment.author).toBeDefined();
    expect(br.jsonComment.author).toEqual("https://violetaruizm.inrupt.net/profile/card#me");
});
test("Date is the expected value", () => {


    let br = new Comment("www.pod.net/viade/comments/routeComments.jsonld","This is a message",
        "https://violetaruizm.inrupt.net/profile/card#me","2020-04-27 17:00:00");

    expect(br).toBeDefined();
    expect(br.jsonComment).toBeDefined();
    expect(br.jsonComment.dateCreated).toBeDefined();
    expect(br.jsonComment.dateCreated).toEqual("2020-04-27 17:00:00");
});

test("Text is the expected value", () => {


    let br = new Comment("www.pod.net/viade/comments/routeComments.jsonld","This is a message",
        "https://violetaruizm.inrupt.net/profile/card#me","2020-04-27 17:00:00");

    expect(br).toBeDefined();
    expect(br.jsonComment).toBeDefined();
    expect(br.jsonComment.text).toBeDefined();
  expect(br.jsonComment.text).toEqual("This is a message");
});