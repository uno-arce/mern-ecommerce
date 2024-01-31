import AdminView from '../components/AdminView.js';
import {useEffect, useState, useContext} from "react";
import UserContext from '../UserContext';

export default function Dashboard() {
	const {user} = useContext(UserContext);
	const [products, setProducts] = useState([]);

	const fetchData = () => {
		fetch(`${process.env.REACT_APP_API_URL}/products/all`, {
			headers: {
				Authorization : `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
		    setProducts(data);
		 });
	}

	useEffect(()=>{
		if(user.role === 'Admin') {
			fetchData()
		}
	}, [])

	return(
		<AdminView productsData = {products} fetchData = {fetchData}/>
	);
}