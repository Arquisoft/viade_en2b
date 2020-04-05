import * as FileLink from "./FileLink";

import * as auth from "solid-auth-client";
import SolidFileClient from "solid-file-client";

const fileClient = new SolidFileClient(auth);

const mockAuth = jest.spyOn(auth, "currentSession");
mockAuth.mockImplementation(async () => {
  return { webId: "https://example.org/profile/card#me" };
});

jest.mock("solid-file-client", () => {
  return jest.fn().mockImplementation(() => {
    return {
      itemExists: jest.fn().mockImplementation(async (routeName) => {
        return routeName === "https://example.org/viade/routes/Oviedo.json";
      }),
      readFile: jest.fn().mockImplementation(async (routeName) => {
        return {
          name: "Oviedo",
          itinerary: [
            {
              "@type": "GeoCoordinates",
              latitude: "85.6768",
              longitude: "77.7665",
            },
            {
              "@type": "GeoCoordinates",
              latitude: "105.6768",
              longitude: "127.7665",
            },
          ],
          media: [
            {
              "@id": "test.mp4",
              dateTime: new Date().toISOString,
            },
          ],
        };
      }),
      putFile: jest.fn().mockImplementation(async (fileUri) => {
        if (fileUri === "error") {
          throw new Error("Expected error.");
        }
      }),
    };
  });
});

const routeNameDummy = "Oviedo";
const filesUris = [
  "pod/viade/resources/image.png",
  "pod/viade/resources/video.avi",
  "pod/myImages/anotherImage.jpeg",
];

const podRouteDummy = {
  name: "Oviedo",
  itinerary: [
    {
      "@type": "GeoCoordinates",
      latitude: "85.6768",
      longitude: "77.7665",
    },
    {
      "@type": "GeoCoordinates",
      latitude: "105.6768",
      longitude: "127.7665",
    },
  ],
  media: [
    {
      "@id": "test.mp4",
      dateTime: new Date().toISOString,
    },
  ],
};

describe("link files to routes", () => {
  test("media is created and the files are added", async () => {
    await FileLink.linkFilesToRoute(filesUris, routeNameDummy);

    expect(SolidFileClient.itemExists).toBeCalled();
    expect(mockSFCReadFile).toBeCalled();
    expect(mockSFCPutFile).toBeCalled();
  });
});
