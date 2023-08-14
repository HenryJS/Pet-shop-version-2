import Breeds from "../components/breeds/breeds"
import Testimonials from "../components/testimonial/testimonial";
import Contact from "../components/testimonial/contact";
import Footer from "../components/shared/footer"
import Navbar from "../components/nav/Navbar"
import Home from "../components/shared/home"

export default function Homepage() {
    return (
      <div className="App">
        <Navbar />
        <Home />
        <Breeds />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    )
}