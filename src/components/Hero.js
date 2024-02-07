import {Container, Row, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import HomeReviews from './HomeReviews.js';
import FeaturedProducts from './FeaturedProducts';

export default function Hero() {
	return(
		<>
		<Container fluid id='hero'>
			<Row>
				<Col className='text-center mt-5 '>
					<div id='hero-title' className='my-4'>
					</div>
					<div className='d-flex justify-content-center align-items-center'>
						<div id='hero-bee-left' className='me-2'></div>
						<h4 id='hero-subtitle' className='mt-5 pt-5 pb-5'>Like bees, discover rare digicams that you'll love</h4>
						<div id='hero-bee-right' className='ms-2'></div>
					</div>
					<div className='d-flex flex-column align-items-center'>
						<h4 className='mt-5 pt-4'>
						  <Link to="/shop" className="link-style">
						    Shop Now
						  </Link>
						</h4>
						<div id='hero-button-line'></div>
					</div>
				</Col>
			</Row>
		</Container>
		<Container fluid id='home'>
			<Row>
				<Col className='m-0 p-0'>
					<div id='home-feedback' className='d-flex align-items-center'>
						<HomeReviews/>
					</div>
					<div id='featured-header' className='d-flex flex-column align-items-center'>
						<div id='featured-icon' className='mt-5'></div>
						<h1 id='featured-title' className='mt-5'>Featured</h1>
						<h6 id='featured-subtitle' className='mt-2 mb-5 pb-5'>Products that are highly loved</h6>
					</div>
					<FeaturedProducts/>
				</Col>
			</Row>
		</Container>
		</>
	);
}