import './Home.css';

import image from "../../Assests/images/Home.jpeg";

import Navbar from '../Navbar/Navbar';

const Home = () => {
    return <div className='home-div1'>
        <Navbar />
        <img src={image} className="bg" />
    </div>;
}

export default Home;