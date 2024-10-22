// Dependencies - React and Next.js
import React from 'react';
// import Link from 'next/link';

// Component - PrivacyPolicyPage
export function PrivacyPolicyPage() {
    // Render the component
    return (
        <div className="container pt-8">
            <h2 className="mb-2">Privacy Policy</h2>
            <p>Effective Date: June 19, 2024</p>

            <h4 className="mb-3 mt-6">1. Information We Collect</h4>
            <p>We collect the following types of information from users:</p>
            <ul className="ml-4 mt-2 list-disc">
                <li>IP addresses, ports, schedules</li>
                <li>Emails, usernames</li>
                <li>Credit cards, addresses, phone numbers</li>
                <li>Usage data, device information</li>
                <li>Location data, communication data</li>
                <li>Analytical data, preferences and settings</li>
                <li>Billing information, service logs</li>
                <li>Feedback and reviews, referral information</li>
            </ul>

            <h4 className="mb-3 mt-6">2. Information Collection Methods</h4>
            <p>We collect information in the following ways:</p>
            <ul className="ml-4 mt-2 list-disc">
                <li>
                    <strong>Directly from Users:</strong> Account registration, service use, communication with support
                </li>
                <li>
                    <strong>Automatically:</strong> Cookies, device information, service logs
                </li>
                <li>
                    <strong>From Third Parties:</strong> Payment processors, marketing partners
                </li>
            </ul>

            <h4 className="mb-3 mt-6">3. Use of Collected Information</h4>
            <p>We use the information to:</p>
            <ul className="ml-4 mt-2 list-disc">
                <li>
                    <strong>Service Provision and Improvement:</strong> Manage accounts, deliver services, enhance
                    functionality
                </li>
                <li>
                    <strong>Customer Support:</strong> Respond to inquiries, troubleshoot issues, send updates
                </li>
                <li>
                    <strong>Billing and Payments:</strong> Process transactions, manage billing
                </li>
                <li>
                    <strong>Marketing and Communication:</strong> Send promotional offers, request feedback
                </li>
                <li>
                    <strong>Security and Compliance:</strong> Monitor security, comply with legal obligations
                </li>
                <li>
                    <strong>Personalization:</strong> Personalize user experience, recommend features
                </li>
            </ul>

            <h4 className="mb-3 mt-6">4. Sharing of User Information</h4>
            <p>We share user information as follows:</p>
            <ul className="ml-4 mt-2 list-disc">
                <li>
                    <strong>Service Providers:</strong> Cloudflare for processing requests, PlanetScale for data storage
                </li>
                <li>
                    <strong>Legal Compliance and Protection:</strong> To comply with legal processes, protect rights
                </li>
                <li>
                    <strong>Business Transactions:</strong> In case of mergers or acquisitions
                </li>
                <li>
                    <strong>User Consent:</strong> With explicit user consent
                </li>
            </ul>

            <h4 className="mb-3 mt-6">5. Protection of User Information</h4>
            <p>We protect user information through:</p>
            <ul className="ml-4 mt-2 list-disc">
                <li>
                    <strong>Encryption:</strong> HTTPS for secure communication, database encryption
                </li>
                <li>
                    <strong>Secure Servers:</strong> Hosted in secure facilities
                </li>
                <li>
                    <strong>Access Controls:</strong> Limited to authorized personnel
                </li>
                <li>
                    <strong>Regular Audits:</strong> Regular security audits and assessments
                </li>
                <li>
                    <strong>Compliance:</strong> Adherence to industry standards and best practices
                </li>
            </ul>

            <h4 className="mb-3 mt-6">6. Access, Update, and Deletion of Information</h4>
            <p>Users can manage their information via connected.app:</p>
            <ul className="ml-4 mt-2 list-disc">
                <li>
                    <strong>Access:</strong> View information in account settings
                </li>
                <li>
                    <strong>Update:</strong> Update personal details in account settings
                </li>
                <li>
                    <strong>Delete:</strong> Follow account deletion instructions or contact support
                </li>
            </ul>

            <h4 className="mb-3 mt-6">7. Cookies and Tracking Technologies</h4>
            <p>We use cookies for:</p>
            <ul className="ml-4 mt-2 list-disc">
                <li>
                    <strong>Theme Management:</strong> Remember user preferences
                </li>
                <li>
                    <strong>Engagement Tracking:</strong> Protect against spam and abuse, gather analytics
                </li>
                <li>
                    <strong>Marketing:</strong> Collect data for future marketing campaigns
                </li>
            </ul>

            <h4 className="mb-3 mt-6">8. User Rights</h4>
            <p>Users have the right to:</p>
            <ul className="ml-4 mt-2 list-disc">
                <li>
                    <strong>Access:</strong> Request a copy of personal data
                </li>
                <li>
                    <strong>Correction:</strong> Request correction of inaccuracies
                </li>
                <li>
                    <strong>Deletion:</strong> Request deletion of data under certain conditions
                </li>
                <li>
                    <strong>Withdraw Consent:</strong> Withdraw consent to data processing at any time
                </li>
            </ul>

            <h4 className="mb-3 mt-6">9. Exercising Data Rights</h4>
            <p>
                Users can exercise their rights by contacting us via{' '}
                <a href="https://connected.app/contact">connected.app/contact</a>.
            </p>

            <h4 className="mb-3 mt-6">10. Data Retention</h4>
            <p>
                We retain user information for as long as necessary to provide our services and fulfill the purposes
                outlined in this Privacy Policy. Data is deleted or anonymized when no longer needed.
            </p>

            <h4 className="mb-3 mt-6">11. Information from Children</h4>
            <p>
                Our services are not intended for children under 13. We do not knowingly collect information from
                children under 13. If you believe we have information about a child under 13, please contact us.
            </p>

            <h4 className="mb-3 mt-6">12. Changes to the Privacy Policy</h4>
            <p>
                We may update this Privacy Policy from time to time. Changes will be posted on our website with a clear
                effective date.
            </p>

            <h4 className="mb-3 mt-6">13. Contact Information</h4>
            <p>
                For questions or concerns about this Privacy Policy, please contact us via{' '}
                <a href="https://connected.app/contact">connected.app/contact</a>.
            </p>
        </div>
    );
}

// Export - Default
export default PrivacyPolicyPage;
