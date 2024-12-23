import './About.css';
import Navbar from './Navbar';
function About()
{
    return(
        <div style={{backgroundColor : 'black',height : '100vh',textAlign : 'center'}}>
        <Navbar />
        <div class="container">
            <h1>About Us</h1>
            <b>
                <p>Welcome to our Hotel Booking System! We are a dedicated team committed to providing 
                    you with the best travel and accommodation experience. Our mission is to make booking 
                    your perfect stay simple, quick, and stress-free.</p>
                <p>Whether you're planning a business trip, a romantic getaway, or a family vacation, our 
                    platform offers a seamless way to explore hotel listings, check room availability, and 
                    book accommodations that suit your needs all in just a few clicks.</p>
                <p>At our Hotel Booking System, we aim to deliver exceptional service and ensure that your 
                    stay is comfortable, enjoyable, and memorable every time.</p>
                <p>If you have any questions or need assistance, please don't hesitate to reach out to us. 
                    We're here to help!</p>
            </b>
        </div>
        </div>
    );
}
export default About;