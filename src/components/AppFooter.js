import {Container, Row, Col, Button, InputGroup, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function AppFooter() {
	return(
		<Container id='footer'>
			<Row>
				<Col className='my-5'>
					<div className='d-flex align-items-center'>
						<div id='footer-profile' className='rounded-circle me-2'></div>
						<div id='footer-name'>Digibees</div>
					</div>
					<div className='d-flex align-items-center mt-3'>
						<Link id='footer-socials' className='rounded-circle bi bi-facebook'></Link>
						<Link id='footer-socials' className='rounded-circle bi bi-linkedin'></Link>
						<Link id='footer-socials' className='rounded-circle bi bi-github'></Link>
					</div>
				</Col>
				<Col className='mt-5 pt-2'>
					<div id='footer-name' className='mb-2'>Contact Us</div>
					<div id='footer-name'>09666519856</div>
					<div id='footer-name'>juanmiguel.arce@cvsu.edu.ph</div>
				</Col>
				<Col className='mt-5 pt-2'>
					<div id='footer-name' className='mb-2'>Subscribe to our newslettter</div>
					<div>
						<InputGroup className="mb-3">
						        <Form.Control
						          placeholder="Recipient's email"
						          aria-label="Recipient's email"
						          aria-describedby="basic-addon2"
						        />
						        <Button variant="outline-secondary" id="button-addon2">
						          Subscribe
						       	</Button>
						</InputGroup>
					</div>
				</Col>
			</Row>
		</Container>
	);
}