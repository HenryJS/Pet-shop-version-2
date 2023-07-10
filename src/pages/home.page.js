import Navbar from "../components/nav/Navbar";
import Home from "../components/nav/home";
import About from "../components/nav/about"


export default function Homepage() {
    return (
      <div className="App">
        <Navbar />
        <Home />
        <About />
      </div>
    )
}