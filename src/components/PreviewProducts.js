import {Row, Col, Card, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function PreviewProducts({data}) {

	const {_id, productName, price, image} = data;

	return(
		<Col>
		  <Card>
		    <Card.Img variant="top" src={`${process.env.REACT_APP_API_URL}${image}`} />
		    <Card.Body>
		      <Card.Title>{productName}</Card.Title>
		      <Card.Text>₱{price}</Card.Text>
		    </Card.Body>
		    <Card.Footer>
		      <Button id='card-button' as={Link} to={`/products/${_id}`} className='w-100'>
		        See product
		      </Button>
		    </Card.Footer>
		  </Card>
		</Col>
	);
}