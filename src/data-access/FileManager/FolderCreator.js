import * as auth from "solid-auth-client";
import SolidFileClient from "solid-file-client";

const fileClient = new SolidFileClient(auth, { enableLogging: true });

export default {
  async main() {
    createFolders();
  },
};
async function createFolders() {
  let session = await auth.currentSession();
  if (!session || session.webId === undefined || session.webId === null) {
    throw new Error("You are not logged in.");
  }

  let path = session.webId.split("profile")[0];
  let routes = `${path}viade/routes/`;
  let comments = `${path}viade/comments/`;
  let inbox = `${path}viade/inbox/`;
  let shared = `${path}viade/shared/`;
  fileClient.createFolder(routes);
  fileClient.createFolder(comments);
  fileClient.createFolder(inbox);
  fileClient.createFolder(shared);
}
