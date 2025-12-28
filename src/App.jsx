import Footer from "./components/Footer";
import Header from "./components/Header";
import Index from "./Index";

export default function App(){
    return(
        <div className="h-screen flex flex-col justify-between">
            <Header/>
            <Index/>
            <Footer/>
        </div>
    )
}