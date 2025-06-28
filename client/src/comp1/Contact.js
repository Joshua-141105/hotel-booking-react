import Navbar from "./Navbar";
import './Contact.css';
function Contact()
{
    const handleSubmit = () =>{
        alert("Feedback submitteed!!!");
    }
    return(
        <div style={{backgroundColor : 'black',height:'100vh'}}>
            <Navbar/>    
            <div class="container">
                <h1>Contact Us</h1>
                <form id="contactForm" onSubmit={handleSubmit}>
                    <label for="name">Your Name</label>
                    <br></br>
                    <input type="text" id="name" name="name" required></input>
                    <br></br>
                    <label for="email">Your Email</label>
                    <br></br>
                    <input type="email" id="email" name="email" required></input>
                    <br></br>
                    <label for="message">Message</label>
                    <br></br>
                    <br></br>
                    <textarea id="message" name="message" rows="5" required></textarea>
                    <br></br>
                    
                    <button type="submit">Send Message</button>
                </form>
            </div>
        </div>
    );
}
export default Contact;