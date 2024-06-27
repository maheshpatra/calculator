// FirestoreService.js
import { firestore } from './firebase';

const messagesCollection = firestore().collection('messages');

// Send a message
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
export const fetchMessages = (callback) => {
  messagesCollection
    .orderBy('timestamp', 'asc')
    .onSnapshot((snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(messages);
    });
};
