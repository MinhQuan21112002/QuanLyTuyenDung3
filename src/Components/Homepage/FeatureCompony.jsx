import { Box, Container, Flex, Text, Image, Heading, Button } from '@chakra-ui/react'
import { ChevronRightIcon, StarIcon } from '@chakra-ui/icons'

import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import { companyService } from '../../Service/company.service'

const data = [
  {
    id: 1,
    name: 'CÔNG TY TNHH BUYMED',
    avatar: 'https://firebasestorage.googleapis.com/v0/b/quanlytuyendung-4fb2c.appspot.com/o/files%2Fcong-ty-tnhh-buymed-f95dc7cac15325af4367f3c8cf5ee0f6-5ff7dd182c9d8.jpg?alt=media&token=31f94198-61ac-4e6a-896b-3a94017bbcd7',
    website: 'https://thuocsi.vn/',
    address: 'Tầng 8, Tòa nhà Vincom Center Đồng Khởi, 72 Lê Thánh Tôn - Phường Bến Nghé - Quận 1 - TP Hồ Chí Minh. ',
    phone: '0123456776',
    info: 'thuocsi.vn được thành lập từ năm 2018, là một trong những startup thành công trong lĩnh vực công nghệ về y tế',
    userId: 3,
  },
  {
    id: 2,
    name: 'CÔNG TY TNHH BUYMED',
    avatar: 'https://firebasestorage.googleapis.com/v0/b/quanlytuyendung-4fb2c.appspot.com/o/files%2Fcong-ty-tnhh-buymed-f95dc7cac15325af4367f3c8cf5ee0f6-5ff7dd182c9d8.jpg?alt=media&token=31f94198-61ac-4e6a-896b-3a94017bbcd7',
    website: 'https://thuocsi.vn/',
    address: 'Tầng 8, Tòa nhà Vincom Center Đồng Khởi, 72 Lê Thánh Tôn - Phường Bến Nghé - Quận 1 - TP Hồ Chí Minh. ',
    phone: '0123456776',
    info: 'thuocsi.vn được thành lập từ năm 2018, là một trong những startup thành công trong lĩnh vực công nghệ về y tế',
    userId: 3,
  },
  {
    id: 3,
    name: 'CÔNG TY TNHH BUYMED',
    avatar: 'https://firebasestorage.googleapis.com/v0/b/quanlytuyendung-4fb2c.appspot.com/o/files%2Fcong-ty-tnhh-buymed-f95dc7cac15325af4367f3c8cf5ee0f6-5ff7dd182c9d8.jpg?alt=media&token=31f94198-61ac-4e6a-896b-3a94017bbcd7',
    website: 'https://thuocsi.vn/',
    address: 'Tầng 8, Tòa nhà Vincom Center Đồng Khởi, 72 Lê Thánh Tôn - Phường Bến Nghé - Quận 1 - TP Hồ Chí Minh. ',
    phone: '0123456776',
    info: 'thuocsi.vn được thành lập từ năm 2018, là một trong những startup thành công trong lĩnh vực công nghệ về y tế',
    userId: 3,
  },
  {
    id: 4,
    name: 'CÔNG TY TNHH BUYMED',
    avatar: 'https://firebasestorage.googleapis.com/v0/b/quanlytuyendung-4fb2c.appspot.com/o/files%2Fcong-ty-tnhh-buymed-f95dc7cac15325af4367f3c8cf5ee0f6-5ff7dd182c9d8.jpg?alt=media&token=31f94198-61ac-4e6a-896b-3a94017bbcd7',
    website: 'https://thuocsi.vn/',
    address: 'Tầng 8, Tòa nhà Vincom Center Đồng Khởi, 72 Lê Thánh Tôn - Phường Bến Nghé - Quận 1 - TP Hồ Chí Minh. ',
    phone: '0123456776',
    info: 'thuocsi.vn được thành lập từ năm 2018, là một trong những startup thành công trong lĩnh vực công nghệ về y tế',
    userId: 3,
  },
  {
    id: 5,
    name: 'CÔNG TY TNHH BUYMED',
    avatar: 'https://firebasestorage.googleapis.com/v0/b/quanlytuyendung-4fb2c.appspot.com/o/files%2Fcong-ty-tnhh-buymed-f95dc7cac15325af4367f3c8cf5ee0f6-5ff7dd182c9d8.jpg?alt=media&token=31f94198-61ac-4e6a-896b-3a94017bbcd7',
    website: 'https://thuocsi.vn/',
    address: 'Tầng 8, Tòa nhà Vincom Center Đồng Khởi, 72 Lê Thánh Tôn - Phường Bến Nghé - Quận 1 - TP Hồ Chí Minh. ',
    phone: '0123456776',
    info: 'thuocsi.vn được thành lập từ năm 2018, là một trong những startup thành công trong lĩnh vực công nghệ về y tế',
    userId: 3,
  },
  {
    id: 6,
    name: 'CÔNG TY TNHH BUYMED',
    avatar: 'https://firebasestorage.googleapis.com/v0/b/quanlytuyendung-4fb2c.appspot.com/o/files%2Fcong-ty-tnhh-buymed-f95dc7cac15325af4367f3c8cf5ee0f6-5ff7dd182c9d8.jpg?alt=media&token=31f94198-61ac-4e6a-896b-3a94017bbcd7',
    website: 'https://thuocsi.vn/',
    address: 'Tầng 8, Tòa nhà Vincom Center Đồng Khởi, 72 Lê Thánh Tôn - Phường Bến Nghé - Quận 1 - TP Hồ Chí Minh. ',
    phone: '0123456776',
    info: 'thuocsi.vn được thành lập từ năm 2018, là một trong những startup thành công trong lĩnh vực công nghệ về y tế',
    userId: 3,
  },
  {
    id: 7,
    name: 'CÔNG TY TNHH BUYMED',
    avatar: 'https://firebasestorage.googleapis.com/v0/b/quanlytuyendung-4fb2c.appspot.com/o/files%2Fcong-ty-tnhh-buymed-f95dc7cac15325af4367f3c8cf5ee0f6-5ff7dd182c9d8.jpg?alt=media&token=31f94198-61ac-4e6a-896b-3a94017bbcd7',
    website: 'https://thuocsi.vn/',
    address: 'Tầng 8, Tòa nhà Vincom Center Đồng Khởi, 72 Lê Thánh Tôn - Phường Bến Nghé - Quận 1 - TP Hồ Chí Minh. ',
    phone: '0123456776',
    info: 'thuocsi.vn được thành lập từ năm 2018, là một trong những startup thành công trong lĩnh vực công nghệ về y tế',
    userId: 3,
  },
]

const FeatureCompony = () => {
  const navigate = useNavigate()
  const [companies, setCompanies] = useState([])
  useEffect(() => {
    companyService
      .getAllCompany()
      .then((res) => setCompanies(res))
      .catch((er) => console.log(er.message))
  }, [])
  return (
    <div>
      <Heading mt={10} mb={10} textAlign='center'>
        Featured companies actively hiring
      </Heading>
      <Box className='container py-4 px-4 justify-conten-center '>
        <Swiper
          freeMode={true}
          grabCursor={true}
          modules={[FreeMode]}
          className='mySwiper'
          slidesPerView={5}
          spaceBetween={30}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}>
          {companies.map((company) => (
            <SwiperSlide>
              <div>
                <Box w={250} h={320} border='1px solid RGBA(0, 0, 0, 0.06)' justifyContent='center' textAlign='center' alignItems='center' ml={30}>
                  <Container margin='auto' justifyContent='center'>
                    <Image mt={5} src={company.avatar} w={'100%'} borderRadius={20} />
                  </Container>
                  <Container width='90%' padding={5} mt={5} bg='green.50' borderRadius='15%'>
                    <Text fontSize={20} fontWeight='bold'>
                      {company.name}
                    </Text>
                  </Container>
                  <Container mt={3}>
                    <Button mt={3} borderRadius='25%' color='teal'>
                      View Jobs
                    </Button>
                  </Container>
                </Box>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Container textAlign='center' mt={10}>
          <Button onClick={() => navigate('/companies')} border='1px solid teal' p={7} borderRadius='30%' bg='white' color='teal' fontWeight='bold'>
            View All compony
          </Button>
        </Container>
      </Box>
    </div>
  )
}

export default FeatureCompony
