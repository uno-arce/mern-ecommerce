import {Container, Row, Col, Button} from 'react-bootstrap';
import {useState, useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';

import Swal from 'sweetalert2';


export default function ViewProduct() {
	const {productId} = useParams();

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [stocks, setStocks] = useState(0);
	const [price, setPrice] = useState(0);
	const [sold, setSold] = useState(0);


	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
		.then(result => result.json())
		.then(data => {
			setName(data.productName);
			setDescription(data.productDescription);
			setStocks(data.stocks);
			setPrice(data.price);
			setSold(data.sold);
		})
	}, [])

	return(
		<>
			<Container fluid className='bg-body-secondary'>
				<Row className='justify-content-center'>
					<Col className='col-4 my-5'>
						<Row className='bg-body-tertiary' style={{ height: '400px' }}>
						</Row>
					</Col>
					<Col className='col-4 my-5 mx-5 d-flex flex-column'>
						<h2>{name}</h2>
						<h4>₱{price}</h4>
						<h6>Sold: {sold}</h6>
						<h6 className='my-5'>{description}</h6>
						<div className='mt-auto'>
							<h6 className='mb-4'>Stocks: {stocks}</h6>
						    <Button variant='secondary'><i className="bi bi-bag"></i></Button>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	)
}