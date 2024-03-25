import React from 'react'
import { BarChart, Bar, ResponsiveContainer, XAxis, Cell } from 'recharts'

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
]

export default function MyBarChart() {
  return (
    <ResponsiveContainer width="100%" aspect={7.0 / 3.0}>
      <BarChart width={100}
        height={400} data={data} >
        <Bar dataKey="uv" radius={[8, 8, 8, 8]} maxBarSize={50} >
          {data.map((entry, index) => (
            <Cell cursor="pointer" fill={index === data.length - 1 ? '#FFA500' : '#D9D9D9FF'} key={`cell-${index}`} />
          ))}
        </Bar>

        {/* <Bar dataKey="uv" fill="#D9D9D9FF" radius={[8, 8, 8, 8]} background={false}  activeBar={<Rectangle fill="#FFA500" color='red'/>} /> */}
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
      </BarChart>
    </ResponsiveContainer>
  )
}