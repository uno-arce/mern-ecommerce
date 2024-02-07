import {CardGroup, Row, Container} from 'react-bootstrap';
import {useEffect, useState} from 'react';

import PreviewProducts from './PreviewProducts.js';

export default function FeaturedProducts() {
	const [previews, setPreviews] = useState([])

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/products/`)
		.then(result => result.json())
		.then(data => {
			
			// Create two empty arrays to be used to store random numbers and featured course data
			const numbers = [];
			const featured = [];

			// Creating a function that will generate a random number from 0 to the length of the data array

			const generateRandomNums = () => {
				let randomNum = Math.floor(Math.random() * data.length)

				if(numbers.indexOf(randomNum) === -1) {
					numbers.push(randomNum)
				} else {
					generateRandomNums();
				}
			}

			for(let i = 0; i < 5; i++) {
				generateRandomNums()

				featured.push(<PreviewProducts data = {data[numbers[i]]} key = {numbers[i]}/>)
			}

			setPreviews(featured);
		})
	}, [])
	return(
		<>
			<Container className='mt-4'>
				<Row lg={2} className='g-5'>
				{previews}
				</Row>
			</Container>
		</>
	);
}