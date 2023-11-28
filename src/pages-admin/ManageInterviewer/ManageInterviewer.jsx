import { Avatar, Box, Button, HStack, Img, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const data = [
  {
    username: 'nhokvn2002',
    email: 'reccer1@gmail.com',
    state: 'ACTIVE',
    role: 'RECRUITER',
    userInfo: {
      id: 3,
      fullName: null,
      gender: null,
      dob: '',
      address: null,
      avatar: 'https://firebasestorage.googleapis.com/v0/b/quanlytuyendung-4fb2c.appspot.com/o/1700846277827_IMG_20230316_230241_268.jpg?alt=media',
      phone: null,
      cv_pdf: '',
      language: null,
      skill: null,
      experience: null,
      description: null,
    },
  },
]

export const ManageInterviewer = () => {
  return (
    <Box backgroundColor={'#e9f3f5'} p={30} overflow='hidden'>
      <VStack>
        <Box w={'100%'}>
          <Button color='white' backgroundColor='rgb(3, 201, 215)'>
            {' '}
            + Thêm thành viên
          </Button>
        </Box>
        <Text pt='20px' fontWeight='black' w='100%'>
          Danh sách đội tuyển dụng
        </Text>
        <Box w='100%' backgroundColor='#ffffff' p='2%' borderRadius={20}>
          <VStack w='100%'>

            <Box p={2} borderRadius={20} w='100%' transition='transform 0.3s ease-in-out' _hover={{ borderWidth:"2px",transform: 'scale(1.006)' }}>
              <HStack>
                <Avatar size='xl' name='Segun Adebayo' src={data[0].userInfo.avatar} />
                <VStack>
                  <Text w='100%' fontWeight={"black"}>Full Name: Nguyen Le quoc Khanh</Text>
                  <Text w='100%' fontWeight={"black"}>Email:  nguyenkhanh2kpi@gmail.com</Text>
                </VStack>
              </HStack>
            </Box>

          </VStack>
        </Box>
      </VStack>
    </Box>
  )
}
