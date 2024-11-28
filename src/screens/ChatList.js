import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import {Avatar, Button, Dialog, Divider, FAB, List, Portal, TextInput} from 'react-native-paper'


const ChatList = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const hideDialog = () => setVisible(false);


  return (
    <View style={{ flex:1}}>
    {/*  
     <List.Item 
     title='User Name'
     description='Hi, I will be waiting for you'
     left={()=><Avatar.Text label='UN' size={56}/>}
     />
     <List.Item 
     title='User Name'
     description='Hi, I will be waiting for you'
     left={()=><Avatar.Text label='UN' size={56}/>}
     />
     <List.Item 
     title='User Name'
     description='Hi, I will be waiting for you'
     left={()=><Avatar.Text label='UN' size={56}/>}
     /> */}

<List.Item 
     title='User Name'
     description='Hi, I will be waiting for you'
     left={()=><Avatar.Text label='UN' size={56}/>}
     />
     <Divider leftInset style={{backgroundColor:'gray'}}/>

     <Portal>
      <Dialog visible={isDialogVisible}
      onDismiss={()=>setIsDialogVisible(false)}
      >
        <Dialog.Title>New Chat</Dialog.Title>
        <Dialog.Content>
          <TextInput label='Enter user email'/>
        
        </Dialog.Content>
        
<Dialog.Actions>
  <Button 
  onPress={()=>setIsDialogVisible(false)}
  >Cancel</Button>
  <Button>Save</Button>
</Dialog.Actions>

      </Dialog>
    </Portal>



<FAB icon='plus' style={{backgroundColor:'aqua', position:'absolute', bottom:100, right:26 }} 
onPress={()=>setIsDialogVisible(true)}
/>
    </View>
  )
}

export default ChatList

const styles = StyleSheet.create({})