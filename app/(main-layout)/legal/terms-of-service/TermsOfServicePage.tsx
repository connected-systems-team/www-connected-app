// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { Link } from '@structure/source/common/navigation/Link';

// Component - TermsOfServicePage
export function TermsOfServicePage() {
    // Render the component
    return (
        <div className="container pt-8">
            <h2 className="mb-2">Terms of Service</h2>

            <p>Effective: June 19, 2024</p>

            <h4 className="mb-3 mt-6">1. Introduction</h4>
            <p>
                Welcome to <Link href="/">Connected</Link>, a service provided by Connected Systems, LLC. By using our
                services, you agree to comply with and be bound by the following Terms of Service.
            </p>

            <h4 className="mb-3 mt-6">2. Purpose</h4>
            <p>
                <Link href="/">Connected</Link> provides foundational network and Internet services, including but not
                limited to port checking, port monitoring, uptime monitoring, alerts, dashboards, network management,
                and various other related services.
            </p>

            <h4 className="mb-3 mt-6">3. Services</h4>
            <p>
                <Link href="/">Connected</Link> offers port checking, port monitoring, and website monitoring services.
            </p>

            <h4 className="mb-3 mt-6">4. Eligibility</h4>
            <p>Our services are available to users worldwide over the age of 13.</p>

            <h4 className="mb-3 mt-6">5. User Responsibilities</h4>
            <p>Users must not:</p>
            <ul className="ml-4 mt-2 list-disc">
                <li>Use our services to break any laws or assist in committing cybercrime.</li>
                <li>Register multiple accounts to abuse free services.</li>
                <li>Engage in harassment, abusive behavior, or misconduct.</li>
                <li>Provide false information.</li>
                <li>Attempt unauthorized access.</li>
                <li>Distribute spam or malicious content.</li>
                <li>Consume excessive resources that disrupt normal operations.</li>
            </ul>

            <h4 className="mb-3 mt-6">6. Free and Paid Services</h4>
            <p>
                We offer free monitoring of ports with a registered account. Users must not register multiple accounts
                to exploit the free service. Paid plans will be introduced soon, with pricing based on resources used,
                invoiced monthly or prepaid annually.
            </p>

            <h4 className="mb-3 mt-6">7. Refunds and Cancellations</h4>
            <p>
                Since billing is per task executed, there are no refunds unless a user wishes to withdraw their prepaid
                balance, which may be restricted initially.
            </p>

            <h4 className="mb-3 mt-6">8. Limitations of Liability</h4>
            <ul className="ml-4 mt-2 list-disc">
                <li>
                    <strong>No Warranties:</strong> Services are provided &quot;as is&quot; without any warranties,
                    express or implied.
                </li>
                <li>
                    <strong>Limitation of Liability:</strong> Connected Systems, LLC is not liable for any direct,
                    indirect, incidental, consequential, or punitive damages.
                </li>
                <li>
                    <strong>Cap on Liability:</strong> Liability is limited to the amount paid by the user for the
                    service in the preceding 12 months.
                </li>
            </ul>

            <h4 className="mb-3 mt-6">9. Account Termination</h4>
            <p>Accounts may be terminated or suspended for:</p>
            <ul className="ml-4 mt-2 list-disc">
                <li>Abusing the system.</li>
                <li>Violating laws.</li>
                <li>Breaching terms.</li>
                <li>Security risks.</li>
                <li>Harassment or misconduct.</li>
                <li>Misrepresentation.</li>
                <li>Unauthorized access.</li>
                <li>Spam or phishing.</li>
                <li>Resource overuse.</li>
            </ul>

            <h4 className="mb-3 mt-6">10. Reporting Violations</h4>
            <p>
                Users can report violations or abuse of the Terms of Service by contacting us through our website at{' '}
                <Link href="/contact">connected.app/contact</Link>.
            </p>

            <h4 className="mb-3 mt-6">11. Changes to Terms</h4>
            <p>
                Changes to the Terms of Service will be notified via a notice on our website, with a clear effective
                date.
            </p>

            <h4 className="mb-3 mt-6">12. Governing Law</h4>
            <p>
                These Terms of Service are governed by the laws of the state of Utah. Any disputes will be resolved in
                the courts located in Utah.
            </p>

            <h4 className="mb-3 mt-6">13. Disclaimers</h4>
            <p>
                Our services are not impervious to disruptions due to natural disasters, third-party provider issues, or
                other unforeseen events.
            </p>

            <h4 className="mb-3 mt-6">14. Third-Party Links and Content</h4>
            <ul className="ml-4 mt-2 list-disc">
                <li>
                    <strong>No Endorsement:</strong> Inclusion of third-party links does not imply endorsement.
                </li>
                <li>
                    <strong>No Responsibility:</strong> We are not responsible for the content, privacy policies, or
                    practices of third-party websites.
                </li>
                <li>
                    <strong>Use at Your Own Risk:</strong> Users access third-party links at their own risk.
                </li>
            </ul>

            <h4 className="mb-3 mt-6">15. User-Generated Content</h4>
            <p>Users can create public dashboards and upload profile pictures. Content must not be:</p>
            <ul className="ml-4 mt-2 list-disc">
                <li>Offensive, hateful, defamatory, or discriminatory.</li>
                <li>Violating privacy or intellectual property rights.</li>
                <li>Illegal or promoting illegal activities.</li>
            </ul>

            <h4 className="mb-3 mt-6">16. Data Security and Privacy</h4>
            <ul className="ml-4 mt-2 list-disc">
                <li>
                    <strong>Data Collection:</strong> We collect and analyze all data entered into the system.
                </li>
                <li>
                    <strong>Third-Party Processing:</strong> Third parties, including Cloudflare and PlanetScale, store
                    and process this data.
                </li>
                <li>
                    <strong>User Consent:</strong> By using the service, users consent to data collection and
                    processing.
                </li>
                <li>
                    <strong>User Rights:</strong> Users have rights to access, correct, and delete their data.
                </li>
            </ul>

            <h4 className="mb-3 mt-6">17. Dispute Resolution</h4>
            <p>
                For any disputes or conflicts, users should contact us at{' '}
                <Link href="/contact">connected.app/contact</Link>.
            </p>

            <h4 className="mb-3 mt-6">18. Intellectual Property</h4>
            <ul className="ml-4 mt-2 list-disc">
                <li>
                    <strong>Ownership:</strong> All trademarks, logos, and proprietary software are owned by Connected
                    Systems, LLC.
                </li>
                <li>
                    <strong>Usage:</strong> Users are granted a limited, non-exclusive, non-transferable license to use
                    the services.
                </li>
                <li>
                    <strong>Restrictions:</strong> Users must not copy, modify, distribute, sell, or lease any part of
                    the services.
                </li>
                <li>
                    <strong>Infringement:</strong> Users must not use any trademarks or logos without permission.
                </li>
            </ul>

            <h4 className="mb-3 mt-6">19. International Users</h4>
            <ul className="ml-4 mt-2 list-disc">
                <li>
                    <strong>Compliance with Local Laws:</strong> Users must comply with all local laws.
                </li>
                <li>
                    <strong>Export Restrictions:</strong> Users must not use the service in violation of U.S. export
                    laws.
                </li>
                <li>
                    <strong>Data Transfer:</strong> Users consent to their data being transferred to and processed in
                    the United States.
                </li>
            </ul>
        </div>
    );
}

// Export - Default
export default TermsOfServicePage;
