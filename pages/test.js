import {useEffect, useState} from 'react'
import axios from 'axios'
import { Text } from '@chakra-ui/react';

const Test = () => {

    const getUser = '/api/getusers'
    const [users, setUsers] = useState([]);

    useEffect( () => {
        

            axios.get(getUser)
            .then((res) => {
                setUsers(res?.data?.getUsers || [])
            })
        
    }, [getUser]) 

  return (
    <div>
        {users.length > 0 && users.map((user) => {
            return (
                <Text key={user._id} > {user.name} </Text>
            )
        })}
    </div>
  )
}

export default Test