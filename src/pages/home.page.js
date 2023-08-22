import Breeds from "../components/breeds/breeds";
import Testimonials from "../components/testimonial/testimonial";
import Contact from "../components/testimonial/contact";
import Footer from "../components/shared/footer";
import Navbar from "../components/nav/Navbar";
import Home from "../components/shared/home";
import { useState } from "react";


export default function Homepage() {
  const [user, setUser] = useState(null); // Initialize user state
    return (
      <div className="App">
        <Navbar user={user} setUser={setUser} />
        <Home />
        <Breeds />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    )
}