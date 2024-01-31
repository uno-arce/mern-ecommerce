import {Container, Row, Col, Button} from 'react-bootstrap';

export default function Hero() {
	return(
		<Container fluid className="d-flex align-items-center justify-content-center" style={{ height: "90vh" }}>
			<Row>
				<Col className='text-center'>
					<h1 className='mt-5'>Digibees</h1>
					<h4 className='mt-5 pt-5 pb-5'>Like bees, discover rare digicams that you'll love</h4>
					<Button className='mt-5'>Shop Now</Button>
				</Col>
			</Row>
		</Container>
	);
}