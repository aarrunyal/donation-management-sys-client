import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CContainer, CSpinner } from '@coreui/react';
import { isLoggedIn } from 'src/helpers/IsLoggedIn';

// routes config
import routes from '../routes';

const AppContent = () => {
	return (
		<CContainer lg>
			<Suspense fallback={<CSpinner color="primary" />}>
				<Routes>
					{routes.map((route, idx) => {
						return (
							route.element && (
								<Route
									key={idx}
									path={route.path}
									exact={route.exact}
									name={route.name}
									element={
										isLoggedIn() ? <route.element /> : <Navigate to="/login" />
									  }
								/>
							)
						);
					})}
					<Route path="/" element={<Navigate to="dashboard" replace />} />
				</Routes>
			</Suspense>
		</CContainer>
	);
};

export default React.memo(AppContent);
