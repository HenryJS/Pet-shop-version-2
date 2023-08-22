import Breeds from "../components/breeds/breeds";
import Testimonials from "../components/testimonial/testimonial";
import Contact from "../components/testimonial/contact";
import Footer from "../components/shared/footer";

import Home from "../components/shared/home";


export default function Homepage() {
    return (
      <div className="App">
   
       
        <Home />
        <Breeds />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    )
}