import Marquee from "react-fast-marquee";

export default function HomeReviews() {
	const feedback1 = `"The products are well packed 
	and safely delivered to me."`;

	return(
		<Marquee pauseOnHover='true' direction='right' speed='20'>
			<div className='ms-5 me-5 d-flex flex-column text-center'>
				<div className='d-flex justify-content-center mb-2'>
					<div id='marquee-avatar-1' className='me-2'></div>
					<div className='d-flex flex-column'>
						<div id='marquee-name'>jessy.santos</div>
						<div id='marquee-stars'></div>
					</div>
				</div>
				<div id='marquee-subtitle'>"The products are well packed</div>
				<div id='marquee-subtitle'>and safely delivered to me"</div>
			</div>
			<div className='ms-5 me-5 d-flex flex-column text-center'>
				<div className='d-flex justify-content-center mb-2'>
					<div id='marquee-avatar-2' className='me-2'></div>
					<div className='d-flex flex-column'>
						<div id='marquee-name'>dahlio.king</div>
						<div id='marquee-stars'></div>
					</div>
				</div>
				<div id='marquee-subtitle'>"Five stars! This camera got</div>
				<div id='marquee-subtitle'>user-friendly interface."</div>
			</div>
			<div className='ms-5 me-5 d-flex flex-column text-center'>
				<div className='d-flex justify-content-center mb-2'>
					<div id='marquee-avatar-3' className='me-2'></div>
					<div className='d-flex flex-column'>
						<div id='marquee-name'>renee.hart</div>
						<div id='marquee-stars'></div>
					</div>
				</div>
				<div id='marquee-subtitle'>"Absolutely thrilled with my</div>
				<div id='marquee-subtitle'>new digital camera!"</div>
			</div>
			<div className='ms-5 me-5 d-flex flex-column text-center'>
				<div className='d-flex justify-content-center mb-2'>
					<div id='marquee-avatar-4' className='me-2'></div>
					<div className='d-flex flex-column'>
						<div id='marquee-name'>samantha.smith</div>
						<div id='marquee-stars'></div>
					</div>
				</div>
				<div id='marquee-subtitle'>"Incredible value for money - the</div>
				<div id='marquee-subtitle'>image stabilization is top notch"</div>
			</div>
			<div className='ms-5 me-5 d-flex flex-column text-center'>
				<div className='d-flex justify-content-center mb-2'>
					<div id='marquee-avatar-5' className='me-2'></div>
					<div className='d-flex flex-column'>
						<div id='marquee-name'>george.baker</div>
						<div id='marquee-stars'></div>
					</div>
				</div>
				<div id='marquee-subtitle'>"Impressive battery life and quick start-up</div>
				<div id='marquee-subtitle'>makes the digicam perfect for travel"</div>
			</div>
			<div className='ms-5 me-5 d-flex flex-column text-center'>
				<div className='d-flex justify-content-center mb-2'>
					<div id='marquee-avatar-6' className='me-2'></div>
					<div className='d-flex flex-column'>
						<div id='marquee-name'>park.shinhye</div>
						<div id='marquee-stars'></div>
					</div>
				</div>
				<div id='marquee-subtitle'>"Impressed by the sleek design and</div>
				<div id='marquee-subtitle'>balanced features of this digital camera."</div>
			</div>
		</Marquee>
	);
}