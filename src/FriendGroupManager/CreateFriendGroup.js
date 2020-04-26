import SolidFileClient from "solid-file-client";

const auth = require("solid-auth-client");
const fileClient = new SolidFileClient(auth, { enableLogging: true });

var groups_path = "viade/groups";
export default {
  friends: [],

  addToNewGroup(friend) {
    this.friends.push(friend);
  },

  addtogroup(groupId, webId) {},

  async creategroup(users, groupname) {
    let session = await auth.currentSession();
    let group_folder =
      session.webId.substring(0, session.webId.length - 16) +
      "/viade/groups/" +
      groupname;

    let new_id = this.create_UUID();
    var group = JSON.stringify(this.group_template(groupname, users, new_id));
    var file = new File([group], groupname + " " + new_id + ".jsonld", {
      type: "application/ld+json",
    });
    console.log(file);
    this.updateFile(group_folder, file, file.type);
  },

  async updateFile(path, content, contentType) {
    return fileClient.putFile(path, content, contentType).catch(console.log);
  },

  async checkexistance(id, group_folder) {
    if (await fileClient.itemExists(group_folder)) {
      try {
        let content = await fileClient.readFolder(group_folder);

        let files = content.files;

        for (let i = 0; i < files.length; i++) {
          if (files[i].url.includes(id)) return true;
        }
      } catch (error) {
        //toast
      }
    } else {
      return false;
    }
  },

  group_template(groupname, users, new_id) {
    var template = {
      "@context": {
        "@version": 1.1,
        users: {
          "@container": "@list",
          "@id": "schema:Person",
        },
        name: {
          "@id": "schema:name",
          "@type": "xs:string",
        },
        url: {
          "@id": "schema:url",
          "@type": "xs:string",
        },
        identifier: {
          "@id": "schema:identifier",
          "@type": "PropertyValue",
          propertyID: "Viade Friend Group",
          value: new_id,
        },
        schema: "http://schema.org/",
        xsd: "http://www.w3.org/2001/XMLSchema#",
      },
      identifier: new_id,
      name: groupname,
      users: [users],
    };

    return template;
  },

  create_UUID() {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  },
};
