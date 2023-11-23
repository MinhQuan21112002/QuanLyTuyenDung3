import { Box, Flex, Text, Badge, Image, SimpleGrid } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import { BsBag } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'
import { BsFillStarFill } from 'react-icons/bs'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadJob } from '../../redux/Job-posting/Action'
import jobData from './jobData'

const JobPage = () => {
  const property = {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt: 'Rear view of modern home with pool',
    beds: 3,
    baths: 2,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    formattedPrice: '$1,900.00',
    reviewCount: 34,
    rating: 4,
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadJob())
  }, [])

  const jobList = useSelector((store) => store.job.data)
  const jobdatas = jobList.map((job) => {
    return job.status === true ? (
      <Link to={`/jobDetail/${job.id}`}>
        <Box maxHeight='140px' display='flex' alignContent='center' maxW='100%' w='100%' borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <Image src={job.image} h='140px' alt='công việc' />

          <Box p='6'>
            <Box display='flex' alignItems='baseline'>
              <Badge borderRadius='full' fontSize='14px' px='2' colorScheme='teal'>
                {job.name}
              </Badge>
            </Box>

            <Box color='gray.500' fontWeight='semibold' letterSpacing='wide' fontSize='xs' textTransform='uppercase' mt='2' mb='2'>
              Địa điểm : {job.location}
            </Box>

            <Box>{job.salary}</Box>
          </Box>
        </Box>{' '}
      </Link>
    ) : (
      <></>
    )
  })

  return (
    <>
      <h1></h1>
      <Box ml='10' mt='120px' fontWeight='bold' width='60%' fontSize='20px'>
        {jobData.length} Jobs Based on your interest
      </Box>
      <Box display='flex' justifyContent='space-between'>
        <SimpleGrid w='100%' top='50' left='50' ml='10' mt='50px' mr='10' columns={3} spacing={'10'}>
          {jobdatas}{' '}
        </SimpleGrid>
      </Box>
    </>
  )
}

export default JobPage
