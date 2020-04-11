import { useNotification, NotificationTypes } from '@inrupt/solid-react-components';


export function ReadNotification(notificationPath, idNotification, webIdOwner){
    console.log(notificationPath);
    console.log(idNotification);
    console.log(webIdOwner);

    const {markAsReadNotification} = useNotification(webIdOwner);

    console.log(markAsReadNotification);
    useNotification(webIdOwner).markAsReadNotification(notificationPath, idNotification);
    //markAsReadNotification( idNotification, notificationPath);
}


