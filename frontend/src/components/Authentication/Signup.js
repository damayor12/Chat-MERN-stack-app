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
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import {useToast} from "@chakra-ui/react"

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory()

  const handleClick = () => setShow(!show);

  // to post picture
  // *********user uploads to cloudinary, then string url of image returned  ********//
  const postDetails = (pics) => {
    setLoading(true);

    if (pics === undefined) {
      toast({
        title: 'Please Select an Image',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }

    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();

      data.append('file', pics); //things for key-value form data
      data.append('upload_preset', 'chatapp');
      data.append('cloud_name', 'dlkdaara8');

      //after appending, now fetch
      fetch('https://api.cloudinary.com/v1_1/dlkdaara8/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json()) //uploads then returns a response with the url
        .then((data) => {
          setPic(data.url.toString());
          console.log('SUCCESS!!!',data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    else {  //if not an image is uploaded
      toast({
        title: 'Please Select an Image',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false)
    }
  };


  const submitHandler = async ( ) => {
      setLoading(true)
      if (!name || !email || !password || !confirmpassword){
        toast({
          title: 'Please Fill All Fields',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
        setLoading(false);
        return
      } 
      
      if (password !== confirmpassword) {
        toast({
          title: 'Passwords should be same',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
        setLoading(false);
        return
      }

      try {
        console.log("attempted!!!")
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        }

        const {data} = await axios.post('/api/user', 
        { name, email, password, pic},
        config
      )
        toast({
          title: 'Registration Successful',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });

        localStorage.setItem('userInfo', JSON.stringify(data))
        setLoading(false);
        history.push('/chats')
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

  }
 
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

      <Button 
        colorScheme="blue" 
        width="100%" 
        style={{ marginTop: 15 }} 
        onClick={submitHandler}
        isLoading={loading}
        >
        
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
