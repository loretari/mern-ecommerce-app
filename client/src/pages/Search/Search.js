import React, {useEffect, useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {Link, useLocation, useNavigate} from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import NewsLetter from "../../components/Newsletter/Newsletter";
import Product from "../Product/Product";
import axios from "axios";





const Search = () => {

    const [products, setProducts] = useState([]);

    const location = useLocation();
    const category = location.pathname.split('/')[2];

    const [categoryData, setCategoryData] = useState("Clothing");
    const navigate = useNavigate();

useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const categoryFromUrl = urlParams.get('category') || categoryData;
    setCategoryData(categoryFromUrl);
}, [location.search, categoryData])

    useEffect(() => {
        const fetchItems = async () => {
            const searchQuery = new URLSearchParams({ category: categoryData }).toString();
            try {
                const res = await axios.get(`https://mern-ecommerce-app-clqa.onrender.com/products/search?${searchQuery}`);
                if (res.status === 200) {
                    setProducts(res.data)
                }
            } catch (error) {
                console.error("Error fetching items:", error);
               setProducts([]);
            }
        }

fetchItems();
    }, [categoryData]);

    const handelSubmit = (e) => {
        e.preventDefault();
        const searchQuery = new URLSearchParams({category: categoryData}).toString();
        navigate(`/search?${searchQuery}`);

    }

    return (
        <div>
            <Navbar/>
            <div style={{ background: "#c5f0fc" }}>
                <Link to="/">
                    <KeyboardBackspaceOutlinedIcon />
                </Link>
            </div>
            <h1 className= "shop-title">{category}</h1>
            <div className= "shop-filterContainer">
                <form onSubmit={handelSubmit}>
                    <div className= "shop-filter">
                        <div className= "shop-filterText">
                            <span>Find by Category:</span>
                        </div>
                        <select className= "shop-select"
                                value={categoryData}
                                onChange={(e) => setCategoryData(e.target.value)} >
                            <option value= "clothing">Clothing</option>
                            <option value = "jewelry">Jewelry</option>
                            <option value= "bags">Bags</option>
                            <option value= "accessories">Accessories</option>
                            <option value= "beauty">Beauty</option>
                            <option value= "shoes">Shoes</option>
                        </select>
                    </div>
                </form>

            </div>
            <div>
                {products.length === 0 ? (
                        <p className="search-found">No items found...</p>
                ) : (  products.map(product => (
                            <Product product={product} key = {product._id}/>
                    ))
                )}
            </div>
            <NewsLetter />
            <Footer/>

        </div>
    )
}

export default Search;
