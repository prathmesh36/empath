--
-- Dumping data for table `CLIENT`
--

INSERT INTO `CLIENT` (`CLIENT_ID`, `CLIENT_NAME`, `CLIENT_DESCRIPTION`, `CLIENT_HOST_URL`, `CREATED_TIMESTAMP`) VALUES
('2dddd57c-228d-11ee-a302-5b0fa40d5ba9', 'Macys LA', 'Department store company', 'http://localhost:8080', '2023-07-14 21:27:05'),
('7faf363a-0c50-11ee-82d2-77b30b486b81', 'Empath LA', 'Hennes & Mauritz AB or H&M Group is a multinational clothing company based in Sweden that focuses on fast-fashion clothing for anyone, any gender', 'http://localhost:8080', '2023-06-16 14:17:17');


--
-- Dumping data for table `EXPERIENCE`
--

INSERT INTO `EXPERIENCE` (`EXP_ID`, `EXP_NAME`, `EXP_DESCRIPTION`, `EXP_LOCATION`, `EXP_COST`, `EXP_QUANTITY`, `EXP_PHOTO_URL`, `EXP_DATE`, `CREATED_TIMESTAMP`) VALUES
('961253ba-0c59-11ee-b26c-a9062e65ee17', 'Ed Sheeran Concert', 'Subtract Concert', 'Los Angeles', 10, 74, 'https://i.pinimg.com/originals/1a/98/f6/1a98f624debaee625022d1edc90504e6.jpg', '2023-12-28', '2023-06-16 15:22:20'),
('a9991b5b-168c-11ee-8bb2-d50aae015967', 'Cold Play Concert', 'Music of Spheres Concert', 'Los Angeles', 10, 98, 'https://i.pinimg.com/736x/c8/f2/47/c8f2476b9267347b24c45c15204879b3.jpg', '2023-07-29', '2023-06-29 14:53:09'),
('b78c461c-168c-11ee-8bb2-4bcb4a50bfbe', 'Taylor Concert', 'The Eras Tour Concert', 'Los Angeles', 10, 96, 'https://i.pinimg.com/736x/9d/89/c7/9d89c7469f6e7b1ad610f27fa7d07358--music-tours-red-tour.jpg', '2023-07-29', '2023-06-29 14:53:32');


--
-- Dumping data for table `LEDGER`
--

INSERT INTO `LEDGER` (`ENTRY_ID`, `USER_ID`, `DEBIT_CREDIT`, `DEBIT_CREDIT_TYPE`, `DEBIT_CREDIT_REFERENCE`, `DEBIT_CREDIT_POINTS`, `CREATED_TIMESTAMP`) VALUES
('02bd2da3-2229-11ee-a302-556bf60364e5', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'C', 'CREDIT_PURCHASE_HISTORY', '7faf363a-0c50-11ee-82d2-77b30b486b81', 10, '2023-07-14 09:30:04'),
('03a6ca54-2229-11ee-a302-1922ae5552e0', '2ec81240-182e-11ee-8cc9-6fc7309e4987', 'C', 'CREDIT_PURCHASE_HISTORY', '7faf363a-0c50-11ee-82d2-77b30b486b81', 10, '2023-07-14 09:30:04'),
('35e0e536-2285-11ee-a302-a15bdf3782b4', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'C', 'CREDIT_SM_INTERACTION', 'mmandar100', 10, '2023-07-14 20:30:02'),
('35f30da7-2285-11ee-a302-273fe2306580', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'C', 'CREDIT_SM_INTERACTION', 'mmandar100', 10, '2023-07-14 20:30:02'),
('35fcaa98-2285-11ee-a302-3b689c705cb3', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'C', 'CREDIT_SM_INTERACTION', 'mmandar100', 10, '2023-07-14 20:30:02'),
('36036159-2285-11ee-a302-6198463a0246', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'C', 'CREDIT_SM_INTERACTION', 'mmandar100', 10, '2023-07-14 20:30:02'),
('360b298a-2285-11ee-a302-3b8bc08f9d29', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'C', 'CREDIT_SM_INTERACTION', 'mmandar100', 10, '2023-07-14 20:30:02'),
('360fe47b-2285-11ee-a302-df8711631a80', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'C', 'CREDIT_SM_INTERACTION', 'mmandar100', 10, '2023-07-14 20:30:02'),
('54f456e9-2219-11ee-bb35-c76f15e72603', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'C', 'CREDIT_PURCHASE_HISTORY', '7faf363a-0c50-11ee-82d2-77b30b486b81', 10, '2023-07-14 07:37:49'),
('6b089fe6-2296-11ee-93b0-7bf61be61c30', '2ec81240-182e-11ee-8cc9-6fc7309e4987', 'C', 'CREDIT_SM_INTERACTION', 'mmandar100', 10, '2023-07-14 22:33:13'),
('6b6bce87-2296-11ee-93b0-2345a3e217c4', '2ec81240-182e-11ee-8cc9-6fc7309e4987', 'C', 'CREDIT_SM_INTERACTION', 'mmandar100', 10, '2023-07-14 22:33:13'),
('6b75e0a8-2296-11ee-93b0-cd71490bed44', '2ec81240-182e-11ee-8cc9-6fc7309e4987', 'C', 'CREDIT_SM_INTERACTION', 'mmandar100', 10, '2023-07-14 22:33:13'),
('6b84d4c9-2296-11ee-93b0-57959244d18f', '2ec81240-182e-11ee-8cc9-6fc7309e4987', 'C', 'CREDIT_SM_INTERACTION', 'mmandar100', 10, '2023-07-14 22:33:13'),
('6b8c27ca-2296-11ee-93b0-1b74852c6497', '2ec81240-182e-11ee-8cc9-6fc7309e4987', 'C', 'CREDIT_SM_INTERACTION', 'mmandar100', 10, '2023-07-14 22:33:14'),
('6b90e2bb-2296-11ee-93b0-c30a312e8457', '2ec81240-182e-11ee-8cc9-6fc7309e4987', 'C', 'CREDIT_SM_INTERACTION', 'mmandar100', 10, '2023-07-14 22:33:14'),
('94e33246-221c-11ee-8830-cbd0098105bc', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'C', 'CREDIT_PURCHASE_HISTORY', '7faf363a-0c50-11ee-82d2-77b30b486b81', 10, '2023-07-14 08:01:04'),
('94f1b137-221c-11ee-8830-bbea5dbdd64c', '2ec81240-182e-11ee-8cc9-6fc7309e4987', 'C', 'CREDIT_PURCHASE_HISTORY', '7faf363a-0c50-11ee-82d2-77b30b486b81', 10, '2023-07-14 08:01:04'),
('9692a4be-228d-11ee-a302-dded9a39d7dc', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'C', 'CREDIT_SM_INTERACTION', 'mmandar100', 10, '2023-07-14 21:30:00'),
('96adf4ef-228d-11ee-a302-e11af49cb4fd', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'C', 'CREDIT_SM_INTERACTION', 'mmandar100', 10, '2023-07-14 21:30:00'),
('96b43680-228d-11ee-a302-1fa8c69b984d', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'C', 'CREDIT_SM_INTERACTION', 'mmandar100', 10, '2023-07-14 21:30:00'),
('96b91881-228d-11ee-a302-57e6d2cd14be', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'C', 'CREDIT_SM_INTERACTION', 'mmandar100', 10, '2023-07-14 21:30:00'),
('96bdac62-228d-11ee-a302-5136d87e6483', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'C', 'CREDIT_SM_INTERACTION', 'mmandar100', 10, '2023-07-14 21:30:01'),
('96c12ed3-228d-11ee-a302-25ba9ecb5f59', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'C', 'CREDIT_SM_INTERACTION', 'mmandar100', 10, '2023-07-14 21:30:01'),
('a38ba67c-2220-11ee-bb8e-2de8886ffbda', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'C', 'CREDIT_PURCHASE_HISTORY', '7faf363a-0c50-11ee-82d2-77b30b486b81', 10, '2023-07-14 08:30:08'),
('a40a254d-2220-11ee-bb8e-895b7e8e0cad', '2ec81240-182e-11ee-8cc9-6fc7309e4987', 'C', 'CREDIT_PURCHASE_HISTORY', '7faf363a-0c50-11ee-82d2-77b30b486b81', 10, '2023-07-14 08:30:08'),
('f9c12c9d-2218-11ee-89c1-3964cad3879f', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'C', 'CREDIT_PURCHASE_HISTORY', '7faf363a-0c50-11ee-82d2-77b30b486b81', 10, '2023-07-14 07:35:16');


--
-- Dumping data for table `MESSAGING`
--

INSERT INTO `MESSAGING` (`MESSAGE_ID`, `CLIENT_ID`, `USER_ID`, `MESSAGE`, `CREATED_TIMESTAMP`, `FLOW`) VALUES
('19e61a7d-22d6-11ee-9f77-196ac48f4ef1', '7faf363a-0c50-11ee-82d2-77b30b486b81', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'Hello', '2023-07-15 06:09:04', b'1'),
('26ba7a40-22a4-11ee-93b0-db997a1550ec', '2dddd57c-228d-11ee-a302-5b0fa40d5ba9', '60ce729c-22a3-11ee-93b0-4324ef95b406', 'Hello', '2023-07-15 00:11:31', b'1'),
('28ea8e2e-22d6-11ee-9f77-87f09173cfff', '2dddd57c-228d-11ee-a302-5b0fa40d5ba9', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'Hello', '2023-07-15 06:09:29', b'1'),
('29c1c6d1-22a4-11ee-93b0-8320b0e93f53', '2dddd57c-228d-11ee-a302-5b0fa40d5ba9', '60ce729c-22a3-11ee-93b0-4324ef95b406', 'I have a query', '2023-07-15 00:11:36', b'1'),
('466677cf-22d6-11ee-9f77-67f95679f651', '2dddd57c-228d-11ee-a302-5b0fa40d5ba9', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'Hello', '2023-07-15 06:10:19', b'1'),
('60ce729c-22a3-11ee-93b0-4324ef95b406', '7faf363a-0c50-11ee-82d2-77b30b486b81', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'Hello ', '2023-07-14 06:23:23', b'1'),
('713895ae-2222-11ee-bb8e-8d1b21f89353', '7faf363a-0c50-11ee-82d2-77b30b486b81', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'I have a query', '2023-07-14 08:43:02', b'1'),
('a6d3eda2-220d-11ee-b8d5-15a4cd0c2a08', '7faf363a-0c50-11ee-82d2-77b30b486b81', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'Hello H&M', '2023-07-14 06:14:12', b'1'),
('c44c4d49-0853-439f-a9bc-c509ddc05831', '7faf363a-0c50-11ee-82d2-77b30b486b81', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'Hello', '2023-07-14 21:29:49', b'0'),
('cbe85c54-228d-11ee-a302-e119d284e380', '2dddd57c-228d-11ee-a302-5b0fa40d5ba9', '60ce729c-22a3-11ee-93b0-4324ef95b406', 'Hello', '2023-07-14 21:31:30', b'0'),
('ee6e4fe3-1032-11ee-b5c1-3f9484d47bc6', '7faf363a-0c50-11ee-82d2-77b30b486b81', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'Hello', '2023-06-21 12:55:43', b'0'),
('febd57cd-2200-11ee-b009-7187dc67ba3a', '2dddd57c-228d-11ee-a302-5b0fa40d5ba9', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'Hi', '2023-07-14 04:43:37', b'0');


--
-- Dumping data for table `ORDER`
--

INSERT INTO `ORDER` (`ORDER_ID`, `EXP_ID`, `USER_ID`, `TOTAL_COST`, `TOTAL_QUANTITY`, `CREATED_TIMESTAMP`, `ORDER_ADDRESS`) VALUES
('1b85a655-2020-11ee-9a13-7d10130bc42a', '961253ba-0c59-11ee-b26c-a9062e65ee17', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 10, 1, '2023-07-11 19:21:17', '1246 W 30th St  Los Angeles CA 90007 US'),
('31ef5435-228f-11ee-a302-05b22f80e37f', '961253ba-0c59-11ee-b26c-a9062e65ee17', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 30, 3, '2023-07-14 21:41:30', '1247 W 30th Street Apt 601 Los Angeles CA 90007 United States'),
('4562eb8e-2207-11ee-b770-75faaa6a6791', 'b78c461c-168c-11ee-8bb2-4bcb4a50bfbe', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 10, 1, '2023-07-14 05:28:32', '1246 W 30th Street Apt. 204 Los Angeles CA 90007 US'),
('53780c26-2292-11ee-a302-09e7d985b9e9', '961253ba-0c59-11ee-b26c-a9062e65ee17', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 20, 2, '2023-07-14 22:03:55', '1247 W 30thh Street Apt 603 Los Angeles CA 90007 United States'),
('73ca0167-1fc9-11ee-b3fa-bbb1aaf69471', '961253ba-0c59-11ee-b26c-a9062e65ee17', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 10, 1, '2023-07-11 09:00:58', '1246 W 30th St, Los Angeles, CA 90007'),
('bc268741-2225-11ee-a302-abd7a9e2e035', 'b78c461c-168c-11ee-8bb2-4bcb4a50bfbe', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 20, 2, '2023-07-14 09:06:36', '1246 W 30th Street Apt. 204 Los Angeles CA 90007 US'),
('c404dacf-22a3-11ee-93b0-a75a6d0008fb', '961253ba-0c59-11ee-b26c-a9062e65ee17', '60ce729c-22a3-11ee-93b0-4324ef95b406', 20, 2, '2023-07-15 00:08:45', '1246 W 30th St  Los Angeles CA 90007 US'),
('d003b99c-22d4-11ee-9f77-19ced8a2d48f', '961253ba-0c59-11ee-b26c-a9062e65ee17', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 40, 4, '2023-07-15 05:59:51', '1246 W 30th St  Los Angeles CA 90007 United States'),
('dc5b2f17-21b3-11ee-97e3-976cc8da7677', 'a9991b5b-168c-11ee-8bb2-d50aae015967', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 10, 1, '2023-07-13 19:31:27', '1246 W 30th St  Los Angeles CA 90007 US'),
('dce2f5e2-2225-11ee-a302-03a8409deff1', '961253ba-0c59-11ee-b26c-a9062e65ee17', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 20, 2, '2023-07-14 09:07:31', '1246 W 30th St  Los Angeles CA 90007 US');


--
-- Dumping data for table `USER`
--

INSERT INTO `USER` (`USER_ID`, `USER_NAME`, `USER_EMAIL`, `USER_PASSWORD`, `USER_AGE`, `USER_GENDER`, `USER_POINTS`, `CREATED_TIMESTAMP`, `INSTAGRAM_ID`, `USER_FIRST_NAME`, `USER_LAST_NAME`, `USER_STATE`, `USER_COUNTRY`) VALUES
('24f9e18c-2012-11ee-8194-6771aa6591ff', 'purva28', 'purvapd28@gmail.com', '$2a$10$rlzKmk/pWjtnSoQrkjjQxeIDwN4RT/wl/4vxpMcUNNPnQZ2xk1lA.', 22, 'female', 100, '2023-07-11 17:41:20', NULL, 'Purva', 'Dharmadhikari', 'CA', 'United States'),
('2ec81240-182e-11ee-8cc9-6fc7309e4987', 'prathmesh1297', 'prathmesh1297@gmail.com', '$2a$10$afcUO8iwD8ojnqDUUS0UMe8WElk4.Kd7T6kuMZOQvZdnTd8Xm.PgS', 25, 'male', 90, '2023-07-01 16:41:52', 'mmandar100', 'Prathamesh', 'Mhapsekar', 'CA', 'United States'),
('46a3d695-2229-11ee-a302-79d077bee63b', 'john100', 'johnsmith@gmail.com', '$2a$10$3IyIjy8zi0If3bZNIlovxeByXY.pVld07spgc7w9SmLZ.lpogILeC', 25, 'male', 0, '2023-07-14 09:31:57', NULL, 'John', 'Smith', 'CA', 'United States'),
('60ce729c-22a3-11ee-93b0-4324ef95b406', 'tim100', 'timwatson@gmail.com', '$2a$10$svFI82U3FiImfLuknVO.Xu8fNa9/FqXF/rZ/V4AdLmnvSD4UWqQWu', 25, 'male', 80, '2023-07-15 00:05:59', 'prathmesh36', 'Tim', 'Watson', 'CA', 'United States'),
('68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'mandar1297', 'mandar1297@gmail.com', '$2a$10$bfZYczjB/6Z9s0FLY5uua./bk6EJybQj5G2frzEQgwwnTlbhPEYBK', 25, 'male', 525, '2023-06-16 12:29:16', 'mmandar100', 'Mandar', 'Mhapsekar', 'CA', 'United States'),
('d4de035a-22d2-11ee-9f77-d51969739802', 'aniket100', 'aniket@gmail.com', '$2a$10$.6kaMN3intmlfAvba0o5XOpTAnewubTBletk3jaYuRtbf9Y0DDbsa', 25, 'male', 0, '2023-07-15 05:45:40', NULL, 'Aniket', 'Mhatre', 'CA', 'United States');


--
-- Dumping data for table `USER_CLIENT_RELATION`
--

INSERT INTO `USER_CLIENT_RELATION` (`USER_CLIENT_RELATION_ID`, `CLIENT_ID`, `USER_ID`, `CLIENT_USER_ID`) VALUES
('47548a8d-228d-11ee-a302-c550b708038b', '2dddd57c-228d-11ee-a302-5b0fa40d5ba9', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'mandar1297'),
('7473225d-22a3-11ee-93b0-a592960a0a02', '2dddd57c-228d-11ee-a302-5b0fa40d5ba9', '60ce729c-22a3-11ee-93b0-4324ef95b406', 'tim100'),
('75f52e7e-22a3-11ee-93b0-2b9a07245e4e', '7faf363a-0c50-11ee-82d2-77b30b486b81', '60ce729c-22a3-11ee-93b0-4324ef95b406', 'tim100'),
('a0a0cb3b-22d3-11ee-9f77-e7d86183cc05', '7faf363a-0c50-11ee-82d2-77b30b486b81', '68bf9f2d-0c41-11ee-ba15-5d7e5ef70443', 'mandar1297'),
('b6e591ee-18f0-11ee-836a-798a7050de40', '7faf363a-0c50-11ee-82d2-77b30b486b81', '2ec81240-182e-11ee-8cc9-6fc7309e4987', 'prathmesh1297'),
('e3b49a8e-220c-11ee-982c-0dc4c00178d1', '7faf363a-0c50-11ee-82d2-77b30b486b81', '24f9e18c-2012-11ee-8194-6771aa6591ff', 'purva28');
