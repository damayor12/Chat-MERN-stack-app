import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [confirmpassword, setConfirmpassword] = useState()
  const [password, setPassword] = useState()
  const [pic, setPic] = useState()

  const handleClick = () => setShow(!show)
  const postDetails = () => {

  }

  const submitHandler = () => {};
  
  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel></FormLabel>
        <Input placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)} />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input type="email" placeholder="Enter Your Email Address" onChange={(e) => setEmail(e.target.value)} />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Enter Your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Confirm your password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Upload Your Picture</FormLabel>
        <Input type="file" p={1.5} accept="image/*" onChange={(e) => postDetails(e.target.files[0])} />
      </FormControl>

      <Button colorScheme="blue" width="100%" style={{ marginTop: 15 }} onClick={submitHandler}>
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
