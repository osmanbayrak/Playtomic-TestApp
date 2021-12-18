import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';

const NotFound: any = (props: {history: any}) => {
    return (
    <div id="content" className='notFound'>
        <h1>404 Page not found!</h1>
        <div><Link to={'/Dashboard'}><Button type='primary'>Back to Home</Button></Link></div>
    </div>
    );
};

export default NotFound;
