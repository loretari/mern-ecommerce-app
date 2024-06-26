import React, { useState, useEffect} from "react";
import "./navbar.css";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {logout} from "../../redux/userSlice";
import { FaSearch } from "react-icons/fa";
// import axios from "axios";
// import {getProductSuccess} from "../../redux/productSlice";
// import {addProduct} from "../../redux/cartSlice";


const Navbar = () => {

    const [text, setText] = useState('');
    const { currentUser } = useSelector((state) => state.user);
    const  cartQuantity  = useSelector((state) => state.cart.quantity);

    const dispatch = useDispatch();

    const location = useLocation();
    // const id = location.pathname.split("/")[2];

    // const product = useSelector((state) => state.product.products);


   const [isScrolled, setIsScrolled] = useState(false);


   const navigate = useNavigate();

   // const [searchResult, setSearchResult] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');
    // const location = useLocation();



    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 0;
            setIsScrolled(scrolled);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);



        // const handleSearch = async () => {
        //     try {
        //  if (!searchTerm.trim()) {
        //    setSearchResult([])
        //   return
        //   } const res = await axios.get("https://mern-ecommerce-app-clqa.onrender.com/products/", {
        //       params: { key: searchTerm, limit: 5 }
        //         });
        //   setSearchResult(res.data.data)
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }





    // useEffect(() => {
    //     const getProduct = async () => {
    //         try {
    //             const res = await axios.get(`https://mern-ecommerce-app-clqa.onrender.com/products/find/`+ id)
    //             console.log("Response:", res);
    //             console.log("Response data:", res.data);
    //
    //             // setProduct(res.data);
    //             dispatch (getProductSuccess(res.data));
    //         } catch (error) {
    //             console.error(error)
    //         }
    //     }
    //
    //     getProduct()
    //     console.log("Product get", id)
    // }, [dispatch, id]);


    //
    // const handleCart = () => {
    //     console.log(product)
    //     dispatch(addProduct({...product, quantity: 1}))
    // }



    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }

    }, [location.search, searchTerm]);

    //
    // const handleSearch = (e) => {
    //  e.preventDefault();
    //    const searchQuery = new URLSearchParams({ searchTerm: text }).toString();
    //         navigate(`/search?${searchQuery}`);
    //
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (searchItem.trim() !== ''){
    //         const urlParams = new URLSearchParams();
    //         urlParams.set('searchItem', searchItem);
    //         navigate(`products/search?${urlParams.toString()}`);
    //     } else {
    //         console.log('Search could not be empty')
    //     }
    // };

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout());
        navigate("/")
    }


    return(
        <div className= {`${"navbar-container"} ${isScrolled ? "scrolled" : ""}`}>
                <div className= "navbar-center">
                    <Link className= "navbar-title"
                          onClick={() => window.scrollTo(0, 0)}
                          to= "/">
                         LorDesIgn
                    </Link>
                </div>

                <form className= "navbar-search">
                    <input
                        type='text'
                        placeholder='Search...'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button className='navbar-searchButton'>
                        <FaSearch />
                    </button>
                </form>
            {/*        {searchResult && searchTerm.length > 0 && (*/}
            {/*            <div className= "product-container">*/}
            {/*                {searchResult.map(product => (*/}
            {/*                    <div key={product._id}>*/}
            {/*                            <img className= "product-image" src={product.image} alt = "" />*/}
            {/*                        <div className= "product-info">*/}
            {/*                            <div className= "product-icon">*/}
            {/*                                <svg className="product-cartIcon"*/}
            {/*                                     onClick={handleCart}*/}
            {/*                                     focusable="false" aria-hidden="true" viewBox="0 0 24 24"*/}
            {/*                                     data-testid="ShoppingCartOutlinedIcon">*/}
            {/*                                    <path*/}
            {/*                                        d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path>*/}
            {/*                                </svg>*/}
            {/*                        </div>*/}
            {/*            </div>*/}
            {/*                    </div>*/}

            {/*                ))}*/}
            {/*            </div>*/}
            {/*        )}*/}
            {/*<Link className= "product-icon"*/}
            {/*      onClick = {() => window.scrollTo(0, 0)}*/}
            {/*      to = {`/product/${product._id}`}*/}
            {/*>*/}
            {/*    <svg className="product-cartIcon"*/}
            {/*         focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SearchOutlinedIcon">*/}
            {/*        <path*/}
            {/*            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>*/}
            {/*    </svg>*/}
            {/*</Link>*/}
            {/*<div className= "product-title">{product.title}</div>*/}
                <div>
                    {currentUser ? (
                        <div className= "navbar-right">
                            <Link className= "navbar-item"

                                  onClick = {() => window.scrollTo(0, 0)}
                                  to= "/cart">


                                <img
                                    className= "currentUser-img"
                                    src={currentUser.avatar}
                                    alt= "profile"/>

                            </Link>
                            <Link to= "/cart">
                                <div className= "navbar-item">
                      <span className="MuiBadge-root css-1c32n2y-MuiBadge-root"><svg
                          className="MuiSvgIcon-root MuiSvgIcon-colorAction
                            MuiSvgIcon-fontSizeMedium css-11pbyhm-MuiSvgIcon-root"
                          focusable="false" aria-hidden="true" viewBox="0 0 24 24"
                          data-testid="ShoppingCartOutlinedIcon"><path
                          d="M15.55 13c.75 0 1.41-.41
                           1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6
                           7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16
                             6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7
                           22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2
                           1.99 2 2-.9 2-2-.9-2-2-2z"></path></svg><span
                          className="MuiBadge-badge MuiBadge-standard
                           MuiBadge-anchorOriginTopRight MuiBadge-anchorOriginTopRightRectangular
                           MuiBadge-overlapRectangular MuiBadge-colorPrimary
                          css-106c1u2-MuiBadge-badge"
                      >
                          {cartQuantity}
                      </span></span>
                                </div>
                            </Link>
                            <button className= "logoutNavbar"
                                    onClick={handleLogout}
                            >LOGOUT</button>
                        </div>
                    ) : (
                        <div className= "navbar-right">
                            <Link className= "navbar-item"
                                  onClick = {() => window.scrollTo(0, 0)}
                                  to= '/register'>REGISTER</Link>

                            <Link className= "navbar-item"
                                  onClick = {() => window.scrollTo(0, 0)}
                                  to= '/login'>LOGIN</Link>

                        </div>
                    )}


                </div>
        </div>


    )
}

export default Navbar;