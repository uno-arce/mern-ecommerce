import {useState} from 'react';
import {Button} from 'react-bootstrap';
import Swal from "sweetalert2";

export default function ArchiveProduct({productId, isActive, fetchData}) {
	const [id, setId] = useState(productId);
	const [isProductActive, setIsProductActive] = useState(isActive);

	const archiveToggle = (event) => {
		 fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/archive`, {
		 		method: 'PUT',
		 		headers: {
		 			'Content-Type': 'application/json',
		 			Authorization: `Bearer ${localStorage.getItem('token')}`
		 		},
		 		body: JSON.stringify({
		 			isActive: false
		 		})
		 	}
		 )
        .then(result => result.json())
        .then(data => {

        	if(data) {
        		Swal.fire({
        			title: "Product Archived!",
                    icon: "success",
        		})
        		fetchData();
        	} else {
            	Swal.fire({
                    title: "Product not updated!",
                    icon: "error",
                    text: 'Please try again!'
                })

            }
            setIsProductActive(false);
        })
	}

	const activateToggle = (event) => {
		 fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/activate`, {
		 		method: 'PUT',
		 		headers: {
		 			'Content-Type': 'application/json',
		 			Authorization: `Bearer ${localStorage.getItem('token')}`
		 		},
		 		body: JSON.stringify({
		 			isActive: true
		 		})
		 	}
		 )
        .then(result => result.json())
        .then(data => {
        	
        	if(data) {
        		Swal.fire({
        			title: "Product Activated!",
                    icon: "success",
                    text: 'Product Activated Successfully!'
        		})
        		fetchData();
        	} else {
            	Swal.fire({
                    title: "Product not updated!",
                    icon: "error",
                    text: 'Please try again!'
                })

            }
        	setIsProductActive(true);
        })    
	}

	return(
		<>
			<Button
			  variant={isActive ? 'danger' : 'success'}
			  onClick={(event) => (isActive ? archiveToggle(event) : activateToggle(event))}
			>
			  {isActive ? 'Archive' : 'Activate'}
			</Button>
		</>
	)
}