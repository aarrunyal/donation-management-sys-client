import React from 'react';

const ProgressBar = ({ progressBarHeight, collected, needToCollected }) => {

	return (
		<>
			<div
				className="progress "
				style={{ height: `${progressBarHeight}px`, width: '100%' }}
			>
				<div
					className="progress-bar bg-info"
					role="progressbar"
					style={{ width: `${collected}%` }}
					aria-valuenow={collected}
					aria-valuemin="0"
					aria-valuemax="100"
				>
					<strong>{`${collected} %`}</strong>
				</div>
				<div
					className="progress-bar bg-warning"
					role="progressbar"
					style={{ width: `${needToCollected}%` }}
					aria-valuenow={needToCollected}
					aria-valuemin="0"
					aria-valuemax="100"
				>
					<strong>{`${needToCollected} %`}</strong>
				</div>
			</div>
		</>
	);
};

export default ProgressBar;
