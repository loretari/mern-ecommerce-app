import React, {useEffect, useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {Link, useLocation, useNavigate} from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import NewsLetter from "../../components/Newsletter/Newsletter";
import Product from "../Product/Product";
import axios from "axios";



const Search = () => {
    const [items, setItems] = useState([]);

    const location = useLocation();
    const category = location.pathname.split('/')[2];

    const [categoryData, setCategoryData] = useState("Clothing");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            const urlParams = new URLSearchParams(location.search);
            const categoryFromUrl = urlParams.get('category');
            if (categoryFromUrl) {
                setCategoryData(categoryFromUrl);
            }

            const searchQuery = urlParams.toString();
            try {
                const res = await axios.get(`https://mern-ecommerce-app-clqa.onrender.com/products?${searchQuery}`);
                console.log("Server response:", response);

                if (res.status === 200) {
                    console.log("Items fetching:", res.data.items)
                    const data = res.data;
                    console.log("Response Data:", data);

                    if (Array.isArray(data) && data.length > 0) {
                        setItems(data);
                    } else {
                        setItems([]);
                    }

                } else {
                    setItems([]);
                }

            } catch (error) {
                console.error("Error fetching items:", error);
                setItems([])
            }
        }

fetchItems();
    }, [location.search]);

    const handelSubmit = async (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('category', categoryData);
        const searchQuery = urlParams.toString();
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
                {items.length === 0 ? (
                    <p className= "search-found">No items found...</p>
                ) : (
                   items.map((item) => <Product item={item} key = {item._id} />)
                )}

            </div>
            <NewsLetter />
            <Footer/>

        </div>
    )
}

export default Search;
