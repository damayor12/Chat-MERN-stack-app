import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';

const Login = () => {

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const toast = useToast()
  const history = useHistory()

  const handleClick = () => setShow(!show)
   
  

 
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: 'Please Fill All Fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }


    try {
      console.log('attempted!!!');
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/user/login', 
        { email, password}, 
        config
      );

      //popup
      toast({
        title: 'Registration Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });

      //set in local storage
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      history.push('/chats');

    } catch (err) {
      toast({
        title: 'Error Occured',
        description: err.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ''}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Enter Your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ''}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button isLoading={loading} colorScheme="blue" width="100%" style={{ marginTop: 15 }} onClick={submitHandler}>
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        isLoading={loading2}
        onClick={() => {
          setEmail('guest@example.com');
          setPassword('123456');
          setLoading2(true);
          setTimeout(() => {
            history.push('/chats');
            setLoading2(false);
          }, 3000);
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
}

export default Login