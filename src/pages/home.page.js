import Breeds from "../components/breeds/breeds"
import Testimonials from "../components/testimonial/testimonial";
import Contact from "../components/testimonial/contact";
import Footer from "../components/shared/footer"
import Navbar from "../components/nav/Navbar"




export default function Homepage() {
    return (
      <div className="App">
        <Navbar />
        <Breeds />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    )
}