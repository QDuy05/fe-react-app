import React, { useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';


const BarChartRecharts = () => {

    const data = [
        {
            name: 'Th 1',
            full: 'Tháng 1',
            s: 4000,
            m: 2400,
            l: 2400,
        },
        {
            name: 'Th 2',
            full: 'Tháng 2',
            s: 3000,
            m: 1398,
            l: 2210,
        },
        {
            name: 'Th 3',
            full: 'Tháng 3',
            s: 2000,
            m: 9800,
            l: 2290,
        },
        {
            name: 'Th 4',
            full: 'Tháng 4',
            s: 2780,
            m: 3908,
            l: 2000,
        },
        {
            name: 'Th 5',
            full: 'Tháng 5',
            s: 1890,
            m: 4800,
            l: 2181,
        },
        {
            name: 'Th 6',
            full: 'Tháng 6',
            s: 2390,
            m: 3800,
            l: 2500,
        },
        {
            name: 'Th 7',
            full: 'Tháng 7',
            s: 3490,
            m: 4300,
            l: 2100,
        },
        {
            name: 'Th 8',
            full: 'Tháng 8',
            s: 3490,
            m: 4300,
            l: 2100,
        },
        {
            name: 'Th 9',
            full: 'Tháng 9',
            s: 3490,
            m: 4300,
            l: 2100,
        },
        {
            name: 'Th 10',
            full: 'Tháng 10',
            s: 3490,
            m: 4300,
            l: 2100,
        },
        {
            name: 'Th 11',
            full: 'Tháng 11',
            s: 3490,
            m: 4300,
            l: 2100,
        },
        {
            name: 'Th 12',
            full: 'Tháng 12',
            s: 3490,
            m: 4300,
            l: 2100,
        },
    ];

    const [hoveredCategory, setHoveredCategory] = useState(null);

    const handleBarMouseOver = (data, index) => {
        setHoveredCategory(data[index]?.name);
    };

    const handleBarMouseLeave = () => {
        setHoveredCategory(null);
    };

    return (
        <ResponsiveContainer width="100%" height={200}>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                stackOffset="sign"
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="m" name='Tàu <15m' stackId="a" fill="#8996FF" barSize={20} />
                <Bar dataKey="s" name='Tàu 15-24m' stackId="a" fill="#1FC198" />
                <Bar dataKey="s" name='Tàu >24m' stackId="a" fill="#378583" />
            </BarChart>


        </ResponsiveContainer>
    )
}
export default BarChartRecharts

