import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, CartesianGrid, Legend} from 'recharts';
import Title from './Title';
import BarChartIcon from '@mui/icons-material/BarChart';

// Generate Sales Data
function createData(time, quantity, amount) {
    return { time, quantity, amount };
}

const data = [
    createData('Jan', 2, 20),
    createData('Feb', 1, 10),
    createData('Mar', 5, 30),
    createData('Apr', 2, 30),
    createData('May', 0, 0),
    createData('Jun', 1, 30),
    createData('Jul', 6, 100),
    createData('Aug', undefined, undefined),
    createData('Sep', undefined, undefined),
    createData('Oct', undefined, undefined),
    createData('Nov', undefined, undefined),
    createData('Dec', undefined, undefined),
];

export default function Chart() {
    const theme = useTheme();

    return (
        <>
            <Title Icon={<BarChartIcon className={"profile-icon"}/>}>Monthly Spendings</Title>
            <ResponsiveContainer width={730} height={250}>
                <LineChart data={data}
                           margin={{
                               top: 16,
                               right: 16,
                               bottom: 0,
                               left: 24,
                           }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" stroke={theme.palette.text.secondary}
                           style={theme.typography.body2}/>
                    <YAxis stroke={theme.palette.text.secondary}
                           style={theme.typography.body2}>
                        <Label
                            angle={270}
                            position="left"
                            style={{
                                textAnchor: 'middle',
                                fill: theme.palette.text.primary,
                                ...theme.typography.body1,
                            }}
                        >
                            Sales ($)
                        </Label>
                    </YAxis>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="quantity"  stroke={theme.palette.primary.main}/>
                    <Line type="monotone" dataKey="amount"  stroke={theme.palette.secondary.main}/>
                </LineChart>
            </ResponsiveContainer>
        </>

    );
}