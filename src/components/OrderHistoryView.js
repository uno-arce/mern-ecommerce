import { useState, useEffect } from 'react';

export default function OrderHistoryView({productData}) {

	const [purchasedOn, setPurchasedOn] = useState('');

	useEffect(() => {
		const formattedDate = new Date(productData.purchasedOn).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
		setPurchasedOn(formattedDate);
	},  [productData])

	return(
		<>
			<div className='d-flex flex-column mb-3'>
				<p id='order-history-small'>receipt no: {productData._id}</p>
				<h6>You ordered {productData.products[0].quantity} <span id='order-history-bold'>{productData.products[0].productName}</span> on {purchasedOn}</h6>
				<h6><span id='order-history-bold'>₱{productData.totalAmount}</span> through <span id='order-history-bold'>{productData.paymentMethod}</span></h6>
				<hr/>
			</div>
		</>
	);
}