import React from 'react'
import { MdOutlineSupervisorAccount } from 'react-icons/md'
import { IoIosMore } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadRoom } from '../redux/Room/Action'
import { loadInterviewer } from '../redux/Interviewer/Action'
import { Link } from 'react-router-dom'
import { Button } from '@chakra-ui/react'
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy'
import { useStateContext } from '../contexts/ContextProvider'
import product9 from '../data/product9.jpg'

const Ecommerce = () => {
  const { currentColor, currentMode } = useStateContext()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadRoom())
    dispatch(loadInterviewer())
  }, [])
  const roomList = useSelector((store) => store.room.data)
  const interviewerList = useSelector((store) => store.interviewer.data)
  console.log(interviewerList)
  return (
    <div className='mt-24'>
      <div className='flex flex-wrap lg:flex-nowrap justify-center '>
        <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center'>
          <div className='flex justify-between items-center'>
            <div>
              <p className='font-bold text-gray-400'>{roomList.length} Phòng</p>
              <p className='text-2xl'>Số lượng phòng</p>
            </div>
          </div>
          <div className='mt-6'>
            <Button height='50px' color='white' bgColor={currentColor} text='Xem chi tiết' borderRadius='10px'>
              <Link to='/roomList'>Xem chi tiết</Link>
            </Button>
          </div>
        </div>
        <div className='flex m-3 flex-wrap justify-center gap-1 items-center'>
          <div key='Người phỏng vấn' className='bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl '>
            <button type='button' style={{ color: '#03C9D7', backgroundColor: '#E5FAFB' }} className='text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl'>
              <MdOutlineSupervisorAccount />
            </button>
            <p className='mt-3'>
              <span className='text-lg font-semibold'>{interviewerList.length} người </span>
            </p>
            <p className='text-sm text-gray-400  mt-1'>Người phỏng vấn</p>
          </div>
          <div key='Ứng viên' className='bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl '>
            <button type='button' style={{ color: 'rgb(255, 244, 229)', backgroundColor: 'rgb(254, 201, 15)' }} className='text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl'>
              <MdOutlineSupervisorAccount />
            </button>
            <p className='mt-3'>
              <span className='text-lg font-semibold'>{interviewerList.length} người </span>
            </p>
            <p className='text-sm text-gray-400  mt-1'>Ứng viên</p>
          </div>
        </div>
      </div>

      

     

     
    </div>
  )
}

export default Ecommerce
