import cache from "caches/friendGroupCache/FriendGroupCache";
import {
  createContentAclMedia
} from "data-access/FileManager/AclCreator";

export default {
  async getUserGroupFriends(callback) {
    const auth = require("solid-auth-client");
    const FC = require("solid-file-client");
    const fc = new FC(auth);
    let groups = [];
    let session = await auth.currentSession();
    //let popupUri = 'https://solid.community/common/popup.html';
    if (!session || session.webId === undefined || session.webId === null) {
      callback();
      return undefined;
    }
    //alert('Logged in as ' + session.webId);
    let group_folder =
      session.webId.substring(0, session.webId.length - 16) + "/viade/groups/"; //"/public/groups/";

    if (
      await fc
        .itemExists(group_folder)
        .then()
        .catch((error) => {
          console.log("There was a problem reading the folder " + group_folder);
          return false;
        })
    ) {
      try {
        //check acl and if not add it
        
        let content = await fc.readFolder(group_folder);
        let files = content.files;

        for (let i = 0; i < files.length; i++) {
          const ur = files[i].url;
          const name = ur.split("/");
          const finalName = name[name.length - 1 ];
          checkAclOrCreateMedia(files[i].url, finalName);
          let fileContent = await fc.readFile(files[i].url);
          groups.push(fileContent);
        }
      } catch (error) {
        console.log("The folder couldn't be read");
        console.log(error); // A full error response
        console.log(error.status); // Just the status code of the error
        console.log(error.message); // Just the status code and statusText
      }
    } else {
      //error
    }

    let rou = this.jsonify(groups);
    //localStorage.setItem('rutas', JSON.stringify(rou));

    cache.setGroups(rou);
  },
  jsonify(groups) {
    var groupsfinal = [];
    groupsfinal = groups.map((group) => JSON.parse(group));
    console.log(groups);
    return groupsfinal;
  },
};

function checkAclOrCreateMedia(url, mediaName) {
  const auth = require("solid-auth-client");
  const FC = require("solid-file-client");
  const fc = new FC(auth);

  if (
    !fc
      .itemExists(url)
      .then()
      .catch((error) => {
        return;
      })
  ) {
    createContentAclMedia(url, mediaName);
  }
}