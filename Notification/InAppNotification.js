import * as Notifications from 'expo-notifications';

const InAppNotification = {
    showInAppNotificationAsync : async (content) => {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
              shouldShowAlert: true,
              shouldPlaySound: false,
              shouldSetBadge: false,
            }),
            handleSuccess: notificationIdentifier => {
              setTimeout(() => Notifications.dismissNotificationAsync(notificationIdentifier), 500);
            }
          });
    
        Notifications.scheduleNotificationAsync({
            content: content,
            trigger: null,
        });
    } 
}

export default InAppNotification;