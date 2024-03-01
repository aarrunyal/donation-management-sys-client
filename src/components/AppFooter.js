import React from 'react';
import { CFooter } from '@coreui/react';

const AppFooter = () => {
    return (
        <CFooter>
            <div>
                <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
                    CoreUI
                </a>
                <span className="ms-1">&copy; 2024 DonationManagementSystem.</span>
            </div>
            <div className="ms-auto">
                <span className="me-1">Powered by</span>
                <a
                    href="https://coreui.io/react"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Login
                </a>
                <span> | </span>
                <img src="../assets/Images/companyLogo.png" alt="Your Company Logo" style={{ width: '30px', height: '30px' }} />
                <div>Scope N&apos; Stack</div>
            </div>
        </CFooter>
    );
};

export default React.memo(AppFooter);
