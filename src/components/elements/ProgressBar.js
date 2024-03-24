import React from 'react';

const ProgressBar = ({ progressBarHeight, collected, needToCollected }) => {
	const calculateValue = () => {
		return Math.round((collected / needToCollected) * 100);
	};

	return (
		<>
			<div
				className="progress "
				style={{ height: `${progressBarHeight}px`, width: '80%' }}
			>
				<div
					className="progress-bar bg-info"
					role="progressbar"
					style={{ width: `${collected}%` }}
					aria-valuenow="65"
					aria-valuemin="0"
					aria-valuemax="100"
				>
					<strong>{calculateValue(collected)} %</strong>
				</div>
				<div
					className="progress-bar bg-warning"
					role="progressbar"
					style={{ width: `${needToCollected}%` }}
					aria-valuenow="35"
					aria-valuemin="0"
					aria-valuemax="100"
				>
					<strong>25%</strong>
				</div>
			</div>
		</>
	);
};

export default ProgressBar;
