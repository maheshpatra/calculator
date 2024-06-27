// FirestoreService.js
import { firestore } from '../../../firebase';

const messagesCollection = firestore().collection('messages');


export const sendMessage = async (text, userId) => {
  try {
    await messagesCollection.add({
      text,
      userId,
      timestamp: firestore.FieldValue.serverTimestamp(),
      
    });
  } catch (error) {
    console.error(error);
  }
};

// Fetch messages


// Fetch messages
export const fetchMessages = (callback) => {
  console.log('fetchMessages called');
  
  // Check if the provided argument is a function
  if (typeof callback !== 'function') {
    console.error('Provided callback is not a function');
    throw new Error('Callback must be a function');
  }

  // Fetch messages from Firestore and call the callback with the messages
  return messagesCollection
    .orderBy('timestamp', 'asc')
    .onSnapshot(
      (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Fetched messages:', messages);
        callback(messages); // Call the callback function with messages
      },
      (error) => {
        console.error("Error fetching messages: ", error);
      }
    );
};