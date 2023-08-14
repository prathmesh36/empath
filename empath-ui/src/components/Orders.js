import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import FlagIcon from '@mui/icons-material/Flag';


function createData(id, date, name, shipTo, quantity, amount) {
    return { id, date, name, shipTo, quantity, amount };
}

const rows = [
    createData(
        0,
        '16 Mar, 2019',
        'Ed Sheeran Concert',
        'Tupelo, MS',
        1,
        312.44,
    ),
    createData(
        1,
        '16 Mar, 2019',
        'Paul McCartney Concert',
        'London, UK',
        2,
        866.99,
    ),
    createData(2,
        '16 Mar, 2019',
        'Tom Scholz Show',
        'Boston, MA',
        3,
        100.81),
    createData(
        3,
        '16 Mar, 2019',
        'Michael Jackson Tribute',
        'Gary, IN',
        5,
        654.39,
    ),
    createData(
        4,
        '15 Mar, 2019',
        'Bruce Springsteen Event',
        'Long Branch, NJ',
        4,
        212.79,
    ),
];



export default function Orders({orders}) {
    return (
        <React.Fragment>
            <Title Icon={<FlagIcon className={"profile-icon"}/>} >User Orders</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Order Id</TableCell>
                        <TableCell>Experience Name</TableCell>
                        <TableCell>Shipping Address</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell align="right">Points</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((row) => (
                        <TableRow key={row.orderId}>
                            <TableCell>{row.createdTimestamp}</TableCell>
                            <TableCell>{row.expName}</TableCell>
                            <TableCell>{row.orderAddress}</TableCell>
                            <TableCell>{row.totalQuantity}</TableCell>
                            <TableCell align="right">{`$${row.totalCost}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}