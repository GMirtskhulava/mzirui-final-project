// scss
import "./styles/style.scss";
import Header from "./layouts/Header";
import Main from "./layouts/Main";
import Footer from "./layouts/Footer";

// components
import Slider from "./components/homePage/Slider";
import Shipping from "./components/homePage/Shipping";
import OurProduct from "./components/homePage/OurProduct";

// https://htmldemo.net/pronia/pronia/index.html
function App() {
    return (
    <>
        <Header />
        <Main>
            <Slider/>
            <Shipping/>
            <OurProduct/>
        </Main>
        <Footer />
    </>
    );
}

export default App;
