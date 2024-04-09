import React, {useState} from 'react';
import './cookieConsent.css';

const CookieConsent = () => {

    const [showMessage, setShowMessage] = useState(true);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setShowMessage(false);
    }

    return (
        showMessage && (
            <div className="cookie-consent">
                <p>This website uses cookies to improve your browsing experience</p>
                <button onClick={handleAccept}>Agree</button>
            </div>
        )

    );
}

export default CookieConsent;