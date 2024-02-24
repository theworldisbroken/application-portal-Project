import React from 'react';
import LoginDialog from '../navbar/components/LoginDialog'

const LandingPage = () => {
    return (
        <div className="page-content" id="LandingPage">
            <LoginDialog />
            <div className='welcome-div-LandingPage'>
                <h1>Study application portal BHT</h1>
                <p>Discover your future with us -
                    your path to success begins here! Find the perfect degree that will bring you closer to your goals.
                    Apply now and secure a place at a renowned university. Ready for the next step? Start your adventure with us.
                    Open up countless opportunities for a successful future..</p>
            </div>
            {/* https://www.creativefabrica.com/de/product/flat-design-magnifier/ */}
            <div className='inform-div-LandingPage'>
                <p>
                    Need Help finding the right thing for you ?
                    Don't Worry, you can contact us via our contact Fomrular and book an appointment and we will help you finding the right thing for sure
                </p>
            </div>
        </div>
    )
}

export default LandingPage; 