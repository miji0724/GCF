import './Home.css';
import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import Body from '../component/Body'
import axios from 'axios';

const Home = () => {
	const [data, setData] = useState('');
	
	useEffect(() => {
    axios.get('/home')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []); 
  
    return (
        <div className="home">
        	<div>
        		<h1>{data}</h1>
        	</div>
            <Header />
            <Body />
            <Footer />
        </div>
    );
}


export default Home;
