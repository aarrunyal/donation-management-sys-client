import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import {
	CAvatar,
	CBadge,
	CDropdown,
	CDropdownHeader,
	CDropdownItem,
	CDropdownMenu,
	CDropdownToggle,
} from '@coreui/react';
import { cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import avatar from './../../assets/images/avatars/avatar.png';
import AuthService from 'src/services/AuthService';
import Toasts from '../toast/Toast';
import { useSelector } from 'react-redux';
import Helper from 'src/services/Helper';

const AppHeaderDropdown = () => {
	const helper = new Helper();
	const authService = new AuthService();

	const user = useSelector((state) => state.user);

	const childRef = useRef();

	const logout = (event) => {
		event.preventDefault();
		childRef.current.showToast('User is logging out', 'loading');
		authService
			.logout()
			.then((response) => {
				localStorage.removeItem('token');
				childRef.current.showToast(
					'success',
					'User logged out successfully !!!'
				);
				setTimeout(() => {
					window.location.href = '/';
				}, 2000);
			})
			.catch((error) => {
				childRef.current.showToast('error');
			});
	};

	return (
		<CDropdown variant="nav-item">
			<CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
				<CAvatar src={avatar} size="md" />
			</CDropdownToggle>
			<CDropdownMenu className="pt-0" placement="bottom-end">
				<CDropdownHeader className="bg-light fw-semibold py-2">
					User name goes here
				</CDropdownHeader>
				<CDropdownItem>
					Hello, <strong>{helper.ucfirst(user.first_name)}</strong>
					<CBadge color="warning" className="ms-2"></CBadge>
				</CDropdownItem>
				<CDropdownItem onClick={logout}>
					<CIcon icon={cilUser} className="me-2" />
					Logout
					<CBadge color="warning" className="ms-2"></CBadge>
				</CDropdownItem>
			</CDropdownMenu>
			<Toasts childRef={childRef} />
		</CDropdown>
	);
};

export default AppHeaderDropdown;
