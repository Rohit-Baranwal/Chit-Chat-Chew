import { Box } from '@chakra-ui/layout'
import React, { useState } from 'react'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/miscellaneous/MyChats'
import ChatBox from '../components/miscellaneous/ChatBox'
import { ChatState } from '../Context/ChatProvider'


const Chatpage = () => {
    
    const { user } = ChatState()
    const [fetchAgain, setFetchAgain] = useState();
    return (
        <div style = {{ width: "100% "}}>
            {user && <SideDrawer/>}
            <Box
             d ="flex"
             justifyContent = 'space-between'
             w='100%'
             h='91.5vh'
             p='10px'
            >
                {user && <MyChats fetchAgain={fetchAgain} />}
                {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </Box>
        </div>
    )
}

export default Chatpage
