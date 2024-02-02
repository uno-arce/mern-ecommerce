import ArchiveProduct from './ArchiveProduct.js';
import {Container, Row, Col, Button, Table, OverlayTrigger, ButtonGroup, InputGroup} from 'react-bootstrap';

import { useState, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom';
import UserContext from '../UserContext';


export default function AdminView() {
	const {user} = useContext(UserContext);
	const [products, setProducts] = useState([]);
	const [productRows, setProductRows] = useState([]);

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
	}, [user.role])

	useEffect(() => {
	  const productsArr = products.map((product, index) => {
	    const popoverContent = (
	    	<ButtonGroup vertical>
	    	      <InputGroup>
	    	      	<InputGroup.Text className="bi bi-pencil">
	    	      	</InputGroup.Text>
	    	      	<Button as = {Link} to = {`/editProduct/${product._id}`} variant='secondary'>Edit</Button>
	    	      </InputGroup>
	    	      <InputGroup>
	    	      	<InputGroup.Text className="bi bi-archive">
	    	      	</InputGroup.Text>
	    	      	<ArchiveProduct productId = {product._id} isActive = {product.isActive} fetchData = {fetchData}/>
	    	      </InputGroup>
	    	</ButtonGroup>
	    );

	    return (
	      <OverlayTrigger
	        key={product._id}
	        trigger="click"
	        placement="top"
	        overlay={popoverContent}
	        rootClose={true}
	      >
	        <tr>
	          <td>{index + 1}</td>
	          <td>{product.productName}</td>
	          <td>{product.productDescription}</td>
	          <td>{product.price}</td>
	          <td>{product.stocks}</td>
	          <td>{product.sold}</td>
	          <td className={product.isActive ? 'text-success' : 'text-danger'}>
	            {product.isActive ? 'Available' : 'Unavailable'}
	          </td>
	        </tr>
	      </OverlayTrigger>
	    );
	  });

	  setProductRows(productsArr);
	}, [products]);

	return(
		<Container fluid>
			<h2 className='mt-lg-5 mx-lg-5 px-lg-5 mt-4'>Welcome back,</h2>
			<div className='d-flex justify-content-between align-items-center mb-4'>
				<h3 className='mt-lg-5 mx-lg-5 px-lg-5 mt-4'>Products</h3>
				<Button as = {Link} to = '/addProduct' className='mt-lg-5 mx-lg-5 px-lg-5 mt-4' variant="primary">Create</Button>
			</div>
			<Row>
				<Col className="mx-lg-5 px-lg-5">
					<Table hover responsive>
					  <thead>
					    <tr>
					      <th>No.</th>
					      <th>Name</th>
					      <th>Description</th>
					      <th>Price</th>
					      <th>Stocks</th>
					      <th>Sold</th>
					      <th>Availability</th>
					    </tr>
					  </thead>
					  <tbody>
					  	{productRows}
					  </tbody>
					</Table>
				</Col>
			</Row>
		</Container>
	)
}