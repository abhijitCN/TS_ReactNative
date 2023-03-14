import About from './components/about';
import ImageSlider from './components/imageSlider';
import Fetures from './components/fetures';
import Skills from './components/skills';
import Navbar from './components/navbar';
function App() {
    return (
        <div className="">
            <div className="mx-auto">
                <Navbar />
                <ImageSlider />
                <Fetures />
            </div>
        </div>
    );
}

export default App;
