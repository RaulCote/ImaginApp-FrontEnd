import React from 'react';
import ReactLoading from 'react-loading';
 
const Loading = ({ type, color }) => (
    <ReactLoading type='bars' color='#fffff' height={50} width={50} />
);
 
export default Loading;