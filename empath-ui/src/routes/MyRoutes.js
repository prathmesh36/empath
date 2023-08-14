import React from 'react';
import {Route, Routes} from 'react-router-dom';
import NotFound from "../components/NotFound";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import Profile from "../components/Profile";
import UpcomingExp from "../components/UpcomingExp";
import YourExp from "../components/YourExp";
import { ProtectedRoute } from "../components/ProtectedRoute";
import SignOut from "../components/SignOut";
import Checkout from "../components/Checkout";
import Messaging from "../components/Messaging";


const MyRoutes = () => (
    <Routes>
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/sign-in' element={<SignIn/>} />
        <Route path='/profile'
               element={
                       <ProtectedRoute>
                           <Profile/>
                       </ProtectedRoute>
                }
        />
        <Route path='/'
               element={
                   <ProtectedRoute>
                       <UpcomingExp/>
                   </ProtectedRoute>
               }
        />
        <Route path='/upcoming-exp'
               element={
                       <ProtectedRoute>
                           <UpcomingExp/>
                       </ProtectedRoute>
               }
         />
        <Route path='/your-exp'
               element={
                       <ProtectedRoute>
                           <YourExp/>
                       </ProtectedRoute>
               }
        />
        <Route path='/sign-out'
               element={
                   <ProtectedRoute>
                        <SignOut/>
                   </ProtectedRoute>
               }
        />
        <Route path='/check-out'
               element={
                   <ProtectedRoute>
                       <Checkout/>
                   </ProtectedRoute>
               }
        />
        <Route path='/messaging'
               element={
                   <ProtectedRoute>
                       <Messaging/>
                   </ProtectedRoute>
               }
        />
        <Route path='*' element={<NotFound/>} />
    </Routes>
);

export default MyRoutes;