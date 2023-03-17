import {FaBars, FaSearch, FaShoppingCart, FaUserCircle} from 'react-icons/fa';
import logo from '../Assets/icon.png';
import {useNavigate} from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const login = () => {
        navigate('/');
    };
    const signUp = () => {
        navigate('/SignUp');
    };
    return (
        <div className="flex justify-between mx-3 mt-3">
            <div className="flex items-center justify-center md:order-2 md:hidden">
                <div className="pr-3 cursor-pointer">
                    <FaBars size={25} />
                </div>
                <div className="md:hidden">
                    <FaSearch size={25} />
                </div>
            </div>
            <div className="flex items-center md:order-1">
                <div className="pr-1">
                    <img src={logo} width="40" height="50" />
                </div>
                <div className="">My Store</div>
                <div className="absolute inset-0 bg-gray-400 w-fit md:static md:w-auto md:bg-white md:flex md:mx-4 md:space-x-2 -translate-x-96 md:translate-x-0">
                    <div className="items">Microsoft 365</div>
                    <div className="items">Office</div>
                    <div className="items">Windows</div>
                    <div className="items">Surface</div>
                    <div className="items">Xbox</div>
                    <div className="items">Support</div>
                </div>
            </div>
            <div className="flex items-center md:order-3">
                <div className="hidden mr-3 md:block">All microsoft</div>
                <div className="hidden mr-3 md:block">
                    <FaSearch size={25} />
                </div>
                <div>
                    <FaShoppingCart size={25} />
                </div>
                <div className="pl-3">
                    <FaUserCircle size={25} color={'blue'} />
                </div>
            </div>
        </div>
    );
}

{
    /* <ul className="flex justify-self-center ">
                <li>Home</li>
                <li>About</li>
                <li>Profile</li>
                <li>Settings</li>
                <li>Add Product</li>
      FaBars      </ul> */
}
