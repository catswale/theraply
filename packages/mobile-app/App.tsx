import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, TextInput, Button
} from 'react-native'
import { API, graphqlOperation } from 'aws-amplify'
import { listTherapists } from './graphql/queries';
import { withAuthenticator } from 'aws-amplify-react-native'
import Amplify, {Auth} from 'aws-amplify'
import config from './aws-exports'
import {Chat} from './src/chat/Chat.page';
Amplify.configure(config)

const initialState = { name: '', description: '' }

const App = () => {
  const [formState, setFormState] = useState(initialState)

  useEffect(() => {
    fetchTherapists()
    async function test() {
      const user = await Auth.currentUserInfo()
      // console.log(user)
    }
    test()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchTherapists() {
    try {
      const therapistsData = await API.graphql(graphqlOperation(listTherapists))
      const therapists = therapistsData.data.listTherapists.items
      console.log(therapists)
    } catch (err) { console.log(err) }
  }

  return <Chat/>

  // return (
  //   <View style={styles.container}>
  //     <TextInput
  //       onChangeText={val => setInput('name', val)}
  //       style={styles.input}
  //       value={formState.name}
  //       placeholder="Name"
  //     />
  //     <TextInput
  //       onChangeText={val => setInput('description', val)}
  //       style={styles.input}
  //       value={formState.description}
  //       placeholder="Description"
  //     />
  //     <Button title="Create Todos" onPress={addTodo} />
  //     {
  //       todos.map((todo, index) => (
  //         <View key={todo.id ? todo.id : index} style={styles.todo}>
  //           <Text style={styles.todoName}>{todo.name}</Text>
  //           <Text>{todo.description}</Text>
  //         </View>
  //       ))
  //     }
  //   </View>
  // )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8 },
  todoName: { fontSize: 18 }
})

export default withAuthenticator(App)