export const handleFetchError = async error => {
  let detailedErrorMessage = "";
  let displayErrorMessage = "";

  console.group("handleFetchError");
  if (error instanceof Response) {
    detailedErrorMessage = await error.text();

    console.error(`url: ${error.url}`);
    console.error(`status: ${error.status}`);

    const displayMessages = {
      "401": `The ressource at ${error.url} requires you to login.`,
      "403": `You don't have permission to access the ressource at ${error.url}.
            Please make sure that you are logged in with the correct account.
            If the server runs with version 5.0.0 or higher, make sure you gave this app read/write permission`,
      "404": `The ressource at ${error.url} was not found`,
      "500": `An internal server error occured...
            ${detailedErrorMessage}`
    };
    if (error.status in displayMessages)
      displayErrorMessage = displayMessages[error.status];
  } else if (error instanceof Error) {
    detailedErrorMessage = error.message;
    console.error(error.stack);
  } else if (typeof error === "string") {
    detailedErrorMessage = error;
  } else {
    detailedErrorMessage = JSON.stringify(error);
  }
  console.error(`errorMessage: ${detailedErrorMessage}`);
  console.error(`error: ${error}`);
  console.groupEnd();

  throw new Error(
    displayErrorMessage ? displayErrorMessage : detailedErrorMessage
  );
}
