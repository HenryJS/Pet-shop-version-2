import Navbar from "../components/nav/Navbar";
import Home from "../components/nav/home";
import About from "../components/nav/about";
import Testimonials from "../components/nav/testimonial";
import Contact from "../components/nav/contact";
import Footer from "../components/footer/footer"




export default function Homepage() {
    return (
      <div className="App">
        <Navbar />
        <Home />
        <About />
        <Testimonials />
        <Contact />
        <Footer />
        
      </div>
    )
}