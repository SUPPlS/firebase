import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Button, View, SafeAreaView, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { firestore, collection, addDoc, serverTimestamp, MESSAGES, query, onSnapshot } from './firebase/Config';
import { convertFirebaseTimeStampToJS } from './helpers/Functions';
import { orderBy } from 'firebase/firestore';

export default function App() {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(firestore, MESSAGES), orderBy('created', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempMessages = [];

      querySnapshot.forEach((doc) => {
        const messageObject = {
          id: doc.id,
          text: doc.data().text,
          created: convertFirebaseTimeStampToJS(doc.data().created),
        };
        tempMessages.push(messageObject);
      });

      setMessages(tempMessages);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const save = async () => {
    try {
      await addDoc(collection(firestore, MESSAGES), {
        text: newMessage,
        created: serverTimestamp(),
      });
      setNewMessage('');
      console.log('Message saved.');
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {messages.map((message) => (
          <View key={message.id} style={styles.message}>
            <Text>{message.text}</Text>
            <Text style={styles.messageInfo}>{message.created}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Send message...'
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <Button title='Send' type='button' onPress={save} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  messageInfo: {
    fontSize: 12,
    marginTop: 5,
    color: 'gray',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
});
