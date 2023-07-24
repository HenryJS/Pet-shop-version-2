import Testimonials from "../components/testimonial/testimonial";
import Contact from "../components/testimonial/contact";
import Footer from "../components/shared/footer"


export default function Homepage() {
    return (
      <div className="App">
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    )
}