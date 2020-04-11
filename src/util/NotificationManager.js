import { discoverInbox } from 'util/LdflexHelper';

export const sendNotification = async (opponent, content, createNotification, to) => {
  try {
    if (to) {
      return createNotification(content, to);
    }
    /**
     * If the opponent doesn't have an inbox, show an error
     */
    throw new Error('Error: The opponent does not have an available inbox');
  } catch (error) {
    throw new Error(error);
  }
};

export const findUserInboxes = async paths => {
  try {
    let inboxes = [];

    console.log('INSIDE FINDUSERINBOXES');
    console.log(paths);

    for await (const path of paths) {
      const { path: currentPath } = path;
      const inbox = await discoverInbox(currentPath);

      if (inbox) {
        inboxes = [...inboxes, { ...path, path: inbox }];
      }
    }

    return inboxes;
  } catch (error) {
    throw new Error(error);
  }
};

export const getDefaultInbox = (inboxes, inbox1, inbox2) =>
  inboxes.find(inbox => inbox.name === inbox1) || inboxes.find(inbox => inbox.name === inbox2);