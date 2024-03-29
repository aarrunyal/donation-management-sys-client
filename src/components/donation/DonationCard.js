import React from 'react';
import ProgressBar from '../elements/ProgressBar';
import Helper from 'src/services/Helper';
import { useNavigate } from 'react-router-dom';

const DonationCard = ({ donation }) => {
	const helper = new Helper();

	const navigate = useNavigate();

	const redirectToDetailPage = (id) => {
		navigate(`/donate/${id}`);
	};

	return (
		<>
				<div className="product_card p-2 mt-2">
					<div className="d-flex flex-column align-items-center ">
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
							collected={helper.calculateCollected(
								donation.total_collected,
								donation.expected_collection
							)}
							needToCollected={helper.calculateToBeCollected(
								donation.total_collected,
								donation.expected_collection
							)}
						/>
					</div>

					<div className=" mt-2">
						<button
							onClick={() => redirectToDetailPage(donation.id)}
							className="btn btn-info donate_btn"
						>
							Donate
						</button>
					</div>
				</div>
			
		</>
	);
};
export default DonationCard;
