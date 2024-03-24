import React from 'react';
import ProgressBar from '../elements/ProgressBar';
import Helper from 'src/services/Helper';
const DonationCard = ({ donation }) => {
	const helper = new Helper();

	return (
		<>
			<div className=" d-flex justify-content-center align-items-center">
				<div className="product_card p-2">
					<div className="d-flex flex-column t align-items-center ">
						<div className="">
							<img
								src={helper.buildImagePath(
									donation.image_path,
									donation.image,
									'thumbnail'
								)}
								className="img-fluid  product_image"
							/>
						</div>

						<div className="mt-2 mb-2 text-center">
							<h4 className="text-uppercase">{donation.name}</h4>
							<div className="mt-1">
								Target:
								<span className="text-success">
									{' '}
									$ {helper.addZeroes(donation.expected_collection, 2)}
								</span>
							</div>
						</div>

						<ProgressBar
							progressBarHeight={15}
							collected={25}
							needToCollected={75}
						/>
					</div>

					<div className="text-center mt-2">
						<button className="btn donate_btn">Donate</button>
					</div>
				</div>
			</div>
		</>
	);
};
export default DonationCard;
