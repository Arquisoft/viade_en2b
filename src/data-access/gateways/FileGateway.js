import * as FileUpload from "../FileManager/FileUpload";
import * as FileLink from "../FileManager/FileLink";
import { toast } from "react-toastify";


export async function uploadFiles(routeName, fileList) {
  if(await FileLink.checkLinkableRoute(routeName)) {    
    let filePaths = await FileUpload.uploadFiles(fileList);
    await FileLink.linkFilesToRoute(filePaths, routeName);

    //only here if everything was succesfull

    toast.success(
      "The file was correctly uploaded",
      {
        draggable: true,
        position: toast.POSITION.TOP_CENTER,
      }
    )

    
  }
}

export async function removeFileAttached() {}
