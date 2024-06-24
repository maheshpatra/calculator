import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from "@notifee/react-native";

export const showNotification = async (
  title,
  message,
  image 
) => {
  const channelId = await notifee.createChannel({
    id: "alert",
    name: "Default Channel",
    importance: AndroidImportance.HIGH,
    vibration: true,
    // sound: "one",
    bypassDnd: true,
    visibility: AndroidVisibility.PUBLIC,
  });

  // Display a notification
  await notifee.displayNotification({
    title,
    body: message,
    android: {
      channelId,

      // Reference the name created (Optional, defaults to 'ic_launcher')
      // smallIcon: "ic_stat_name",
      // Set color of icon (Optional, defaults to white)
      color: "green",
      actions: [
        {
          title: '<b>Accept</b> ',
          pressAction: { id: 'accept', launchActivity: 'default' },
        },
        {
          title: '<p style="color: #f44336;"><b>Reject</b> &#128557;</p>',
          pressAction: { id: 'reject'},
        },
      ],

    },
  });
};