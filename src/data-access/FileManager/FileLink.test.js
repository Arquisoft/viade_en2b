import * as FileLink from "./FileLink";

import * as auth from "solid-auth-client";

const mockAuth = jest.spyOn(auth, "currentSession");
mockAuth.mockImplementation(async () => {
  return { webId: "https://example.org/profile/card#me" };
});

const mockItemExists = jest.fn().mockImplementation(async (routeName) => {
  return routeName === "https://example.org/viade/routes/Oviedo.json";
});
const mockReadFile = jest.fn().mockImplementation(async (routeName) => {
  return `{
    "name": "Oviedo",
    "itinerary": [
      {
        "@type": "GeoCoordinates",
        "latitude": "85.6768",
        "longitude": "77.7665"
      },
      {
        "@type": "GeoCoordinates",
        "latitude": "105.6768",
        "longitude": "127.7665"
      }
    ],
    "media": [
      {
        "@id": "test.mp4",
        "dateTime": "2020-04-06"
      }
    ]
  }`;
});
const mockPutFile = jest.fn().mockImplementation(async () => {});
jest.mock("solid-file-client", () => {
  return jest.fn().mockImplementation(() => {
    return {
      itemExists: mockItemExists,
      readFile: mockReadFile,
      putFile: mockPutFile,
    };
  });
});

const routeNameDummy = "Oviedo";
const filesUris = [
  "pod/viade/resources/image.png",
  "pod/viade/resources/video.avi",
  "pod/myImages/anotherImage.jpeg",
];

const podRouteDummy = `{
  "name": "Oviedo",
  "itinerary": [
    {
      "@type": "GeoCoordinates",
      "latitude": "85.6768",
      "longitude": "77.7665"
    },
    {
      "@type": "GeoCoordinates",
      "latitude": "105.6768",
      "longitude": "127.7665"
    }
  ],
  "media": [
    {
      "@id": "test.mp4",
      "dateTime": "2020-04-06"
    }
  ]
}`;

describe("link files to routes", () => {
  test("media is created and the files are added", async () => {
    await FileLink.linkFilesToRoute(filesUris, routeNameDummy);

    expect(mockItemExists).toBeCalled();
    expect(mockReadFile).toBeCalled();
    expect(mockPutFile).toBeCalled();
  });
});
