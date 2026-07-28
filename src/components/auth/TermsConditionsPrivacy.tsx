import React from 'react'
import { Link } from 'react-router-dom'

const TermsConditionsPrivacy:React.FC = () => {
    return (
        <>
            <p className="text-center text-xs leading-6 text-gray-500">
                By creating an account, you agree to our{" "}
                <Link
                    to="/terms-conditions"
                    className="font-medium text-purple hover:underline"
                >
                    Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link
                    to="/privacy-policy"
                    className="font-medium text-purple hover:underline"
                >
                    Privacy Policy
                </Link>
                .
            </p>
        </>
    )
}

export default TermsConditionsPrivacy