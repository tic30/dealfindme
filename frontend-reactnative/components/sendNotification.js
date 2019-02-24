import { Permissions, Notifications } from 'expo';
import{ Text, View } from 'react-native';
import Expo from 'expo-server-sdk';

//Part1.Save the user's token to backend
const PUSH_ENDPOINT = 'http://localhost:3000/';

state = {
  tokens: null,
  notification: {
    origin: "selected",
    data: null
  },
};

async function registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

// only ask if permissions have not already been determined, because
// iOS won't necessarily prompt the user a second time.
if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token,
      },
    }),
  })
  .then(
    data =>
    this.setState({
      tokens: data
    })
  );
}

//Part2. Call expo's push api with the user's token
let expo = new Expo();
// Create the messages that you want to send to clents
let messages = [];
for (let pushToken of this.tokens) {
  // Check that all your push tokens appear to be valid Expo push tokens
  if (!Expo.isExpoPushToken(pushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`);
    continue;
  }
  // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
  messages.push({
    to: pushToken,
    sound: 'default',
    body: 'Hi, our deal finds you!',
  })
}

// The Expo push notification service accepts batches of notifications so
// that you don't need to send 1000 requests to send 1000 notifications. We
// recommend you batch your notifications to reduce the number of requests
// and to compress them (notifications with similar content will get
// compressed).

let chunks = expo.chunkPushNotifications(messages);
let tickets = [];
(async () => {
  // Send the chunks to the Expo push notification service. There are
  // different strategies you could use. A simple one is to send one chunk at a
  // time, which nicely spreads the load out over time:
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(ticketChunk);
      tickets.push(...ticketChunk);
      // NOTE: If a ticket contains an error code in ticket.details.error, you
      // must handle it appropriately. The error codes are listed in the Expo
      // documentation:
      // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
    } catch (error) {
      console.error(error);
    }
  }
})();

// Later, after the Expo push notification service has delivered the
// notifications to Apple or Google (usually quickly, but allow the the service
// up to 30 minutes when under load), a "receipt" for each notification is
// created. The receipts will be available for at least a day; stale receipts
// are deleted.
//
// The ID of each receipt is sent back in the response "ticket" for each
// notification. In summary, sending a notification produces a ticket, which
// contains a receipt ID you later use to get the receipt.
//
// The receipts may contain error codes to which you must respond. In
// particular, Apple or Google may block apps that continue to send
// notifications to devices that have blocked notifications or have uninstalled
// your app. Expo does not control this policy and sends back the feedback from
// Apple and Google so you can handle it appropriately.
let receiptIds = [];
for (let ticket of tickets) {
  // NOTE: Not all tickets have IDs; for example, tickets for notifications
  // that could not be enqueued will have error information and no receipt ID.
  if (ticket.id) {
    receiptIds.push(ticket.id);
  }
}

let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
(async () => {
  // Like sending notifications, there are different strategies you could use
  // to retrieve batches of receipts from the Expo service.
  for (let chunk of receiptIdChunks) {
    try {
      let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
      console.log(receipts);

      // The receipts specify whether Apple or Google successfully received the
      // notification and information about an error, if one occurred.
      for (let receipt of receipts) {
        if (receipt.status === 'ok') {
          continue;
        } else if (receipt.status === 'error') {
          console.error(`There was an error sending a notification: ${receipt.message}`);
          if (receipt.details && receipt.details.error) {
            // ERROR HANDLER
            console.error(`The error code is ${receipt.details.error}`);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
})();

//Part3. Add a listener using the Notifications API
export default class sendNotification extends React.Component {

  componentDidMount() {
    registerForPushNotificationsAsync();
     // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    this.setState({notification: notification});
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Origin: {this.state.notification.origin}</Text>
        <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
      </View>
    );
  }
}

