import ArchiveProduct from './ArchiveProduct.js';
import {Container, Row, Col, Button, Table, OverlayTrigger, ButtonGroup, InputGroup, Accordion} from 'react-bootstrap';

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

	// useEffect(() => {
	//   const productsArr = products.map((product, index) => {
	//     const popoverContent = (
	//     	<ButtonGroup vertical>
	//     	      <InputGroup>
	//     	      	<InputGroup.Text className="bi bi-pencil">
	//     	      	</InputGroup.Text>
	//     	      	<Button as = {Link} to = {`/editProduct/${product._id}`} variant='secondary'>Edit</Button>
	//     	      </InputGroup>
	//     	      <InputGroup>
	//     	      	<InputGroup.Text className="bi bi-archive">
	//     	      	</InputGroup.Text>
	//     	      	<ArchiveProduct productId = {product._id} isActive = {product.isActive} fetchData = {fetchData}/>
	//     	      </InputGroup>
	//     	</ButtonGroup>
	//     );

	//     return (
	//       <OverlayTrigger
	//         key={product._id}
	//         trigger="click"
	//         placement="top"
	//         overlay={popoverContent}
	//         rootClose={true}
	//       >
	//         <tr>
	//           <td>{index + 1}</td>
	//           <td>{product.productName}</td>
	//           <td>{product.productDescription}</td>
	//           <td>{product.price}</td>
	//           <td>{product.stocks}</td>
	//           <td>{product.sold}</td>
	//           <td className={product.isActive ? 'text-success' : 'text-danger'}>
	//             {product.isActive ? 'available' : 'unavailable'}
	//           </td>
	//         </tr>
	//       </OverlayTrigger>
	//     );
	//   });

	//   setProductRows(productsArr);
	// }, [products]);

	useEffect(() => {
	  const productsArr = products.map((product, index) => {
	    return (
	     	<Accordion className='mt-2'>
	          	<Accordion.Item eventKey={product._id}>
	          		<Accordion.Header>
	          			<div className='me-4'>{index + 1}</div>
	          			<div className='d-flex flex-column'>
	          				<div className='mb-2'>{product.productName}</div>
	          				<div className='d-flex'>
	          					<i className={`bi bi-circle-fill me-2 ${product.isActive ? 'text-success' : 'text-danger'}`}></i>  
		          				<div className={product.isActive ? 'text-success' : 'text-danger'}>
		          					{product.isActive ? 'Available' : 'Unavailable'}
		          				</div>
	          				</div>
	          			</div>
	          		</Accordion.Header>
	          		<Accordion.Body>
	          			<div className='mb-3'>{product.productDescription}</div> 
	          			<h6>Stats</h6>
	          			<div className='d-flex mb-3'>
	          				<div className='me-1'>
	          					<InputGroup>
	          						<InputGroup.Text>
	          						₱
	          						</InputGroup.Text>
	          						<InputGroup.Text>
	          							{product.price}
	          						</InputGroup.Text>
	          					</InputGroup>
	          				</div>
	          				<div className='me-1'>
	          					<InputGroup>
	          						<InputGroup.Text className="bi bi-bag-check">
	          						</InputGroup.Text>
	          						<InputGroup.Text>
	          							{product.sold} sold
	          						</InputGroup.Text>
	          					</InputGroup>
	          				</div>
	          				<div>
	          					<InputGroup>
	          						<InputGroup.Text className="bi bi-cart">
	          						</InputGroup.Text>
	          						<InputGroup.Text>
	          							{product.stocks} left
	          						</InputGroup.Text>
	          					</InputGroup>
	          				</div>
	          			</div>
	          			<h6>Actions</h6>
	          			<div className='d-flex'>
	          				<div className='me-1'>
	          					<InputGroup>
	          						<InputGroup.Text className="bi bi-pencil">
	          						</InputGroup.Text>
	          						<Button as = {Link} to = {`/editProduct/${product._id}`} variant='secondary'>Edit</Button>
	          					</InputGroup>
	          				</div>
	          				<div>
	          					<InputGroup>
	          						<InputGroup.Text className="bi bi-archive">
	          						</InputGroup.Text>
	          						<ArchiveProduct productId = {product._id} isActive = {product.isActive} fetchData = {fetchData}/>
	          					</InputGroup>
	          				</div>
	          			</div>
	          		</Accordion.Body>
	          	</Accordion.Item>
	        </Accordion>
	    );
	  });

	  setProductRows(productsArr);
	}, [products]);

	return(
		<>
		<Container fluid className='bg-body-secondary py-4'>
			<Row>
				<Col>
					<div>
						<h2 className='mt-lg-5 mx-lg-5 px-lg-5'>Welcome back,</h2>
					</div>
					<div className='d-flex justify-content-between align-items-center mt-lg-5 '>
						<h4 className='mx-lg-5 px-lg-5 mt-4'>Products</h4>
						<div>
							<InputGroup className='me-lg-5 pe-lg-5 mt-4'>
								<InputGroup.Text className="bi bi-patch-plus">
								</InputGroup.Text>
								<Button as = {Link} to = '/addProduct' variant='secondary'>Create</Button>
							</InputGroup>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
		<Container fluid>
			<Row>
				<Col className="mx-lg-5 px-lg-5">
					{productRows}
				</Col>
			</Row>
		</Container>
		</>
	)
}