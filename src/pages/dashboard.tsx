/* eslint-disable @typescript-eslint/ban-types */
import Column from '@ui-center/molecules/column'
import Row from '@ui-center/molecules/row'
import Card from '@ui-cms/atoms/card'
import Text from '@ui-cms/atoms/text'
import MyBarChart from '@ui-cms/molecules/charts/bar-chart'
import Image from 'next/image'
import React from 'react'
import { IoQrCode } from 'react-icons/io5'
import { MdFastfood } from 'react-icons/md'
import { TbCategoryFilled } from 'react-icons/tb'
import { BarChart } from 'recharts'
import { MultipartDropzone } from '~/components/ui-cms/molecules/muti-dropzone'
import { StandardDropzone } from '~/components/ui-cms/molecules/standard-dropzone'
import { api } from '~/utils/api'
import withAuth from '~/utils/withAuth'

type Props = {}

const DashboardPage = (props: Props) => {
  const { data, isLoading, error } = api.s3.getObjects.useQuery()

  return (
    <Column gap={6}>
      <Text value={"Dashboard"} className='text-2xl font-bold' />
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
        <Card className=''>
          <Column>
            <Row gap={1} className='justify-end'>
              <IoQrCode size={20} color='#2BC857FF' />
              <Text value={'Total Scan'} className='font-medium lg:text-lg' />
            </Row>
            <Column>
              <Text value={'540'} className='text-5xl font-semibold text-right' />
            </Column>
          </Column>
        </Card>
        <Card className=''>
          <Column>
            <Row gap={1} className='justify-end'>
              <MdFastfood size={20} color='#C33638FF' />
              <Text value={'Your menu'} className='font-medium lg:text-lg' />
            </Row>
            <Column>
              <Text value={'20'} className='text-5xl font-semibold text-right' />
            </Column>
          </Column>
        </Card>
        <Card className=''>
          <Column>
            <Row gap={1} className='justify-end'>
              <TbCategoryFilled size={20} color='#3A93C5FF' />
              <Text value={'Total Category'} className='font-medium lg:text-lg' />
            </Row>
            <Column>
              <Text value={'2'} className='text-5xl font-semibold text-right' />
            </Column>
          </Column>
        </Card>
        <Card className=''>
          <Column>
            <Row gap={1} className='justify-end'>
              <TbCategoryFilled size={20} color='#3A93C5FF' />
              <Text value={'Total Category'} className='font-medium lg:text-lg' />
            </Row>
            <Column>
              <Text value={'2'} className='text-5xl font-semibold text-right' />
            </Column>
          </Column>
        </Card>


      </div>
      {/* chart */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card>
          <Column gap={2} >
            <Column>
              <Row>
                <Text value={'User see the website'} className=' text-gray-500 font-semibold' />
                <Text value={'89%'} className='  font-semibold text-green-500' />
              </Row>
              <Text value={'14,500 time'} className='  font-semibold text-2xl' />
            </Column>
            <MyBarChart />
          </Column>
        </Card>
        <Card>
          <Column gap={2} >
            <Column>
              <Row>
                <Text value={'User see the website'} className=' text-gray-500 font-semibold' />
                <Text value={'89%'} className='  font-semibold text-green-500' />
              </Row>
              <Text value={'14,500 time'} className='  font-semibold text-2xl' />
            </Column>
            <MyBarChart />
          </Column>
        </Card>

      </div>
    </Column>
  )
}

export default withAuth(DashboardPage)