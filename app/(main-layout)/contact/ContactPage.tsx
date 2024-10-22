'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
// import { GraphQlOperationForm } from '@structure/source/api/GraphQlOperationForm';
// import { FormInputTextArea } from '@structure/source/common/forms/FormInputTextArea';
// import { Alert } from '@structure/source/common/notifications/Alert';

// Dependencies - API
// import { EmailContactOperation } from '@project/source/api/GraphQlGeneratedCode';

// Component - ContactPage
export function ContactPage() {
    // State
    // const [showFormResponseSuccess, setShowFormResponseSuccess] = React.useState(false);

    // Render the component
    return (
        <div className="container pt-8">
            <h2>Contact Connected</h2>
            <p className="mt-8">
                You may use this form to send a message to the Connected team. We look forward to hearing from you!
            </p>
            {/* <GraphQlOperationForm
                className="mt-8"
                operation={EmailContactOperation}
                inputComponentsProperties={{
                    'input.fromAddress': {
                        label: 'Your Email Address',
                    },
                    'input.fromName': {
                        label: 'Your Name',
                    },
                    'input.content': {
                        component: FormInputTextArea,
                        rows: 10,
                    },
                    'input.contentFormat': {
                        className: 'hidden',
                        defaultValue: 'Plain',
                    },
                }}
                buttonProperties={{
                    children: 'Send Message',
                }}
                resetOnSubmitSuccess={true}
                onSubmit={function () {
                    setShowFormResponseSuccess(true);
                }}
            /> */}

            {/* {showFormResponseSuccess && (
                <Alert className="mt-8" variant="success" title={<b>Message Sent</b>}>
                    <p>Thank you for reaching out! We will respond as soon as possible.</p>
                </Alert>
            )} */}
        </div>
    );
}

// Export - Default
export default ContactPage;
