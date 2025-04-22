'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { Link } from '@structure/source/common/navigation/Link';
import { Button } from '@structure/source/common/buttons/Button';
import { AutomatedPortChecker } from './AutomatedPortChecker';

// TestCase interface to define our test cases
interface TestCase {
    id: string;
    name: string;
    host: string;
    port: number;
    description: string;
    expectedResult: string;
    category: 'valid' | 'error' | 'special';
}

// Component - TestPortCheckerPage
export function TestPortCheckerPage() {
    // State for test execution
    const [selectedTest, setSelectedTest] = React.useState<TestCase | null>(null);
    const [testResults, setTestResults] = React.useState<Record<string, boolean>>({});
    const [currentPage, setCurrentPage] = React.useState<'list' | 'test' | 'results' | 'batch'>('list');

    // Define test cases
    const testCases: TestCase[] = [
        // Valid Host Test Cases
        {
            id: 'open-port',
            name: 'Open Port (HTTP)',
            host: 'google.com',
            port: 80,
            description: 'Tests a standard open HTTP port',
            expectedResult: 'Port is open',
            category: 'valid',
        },
        {
            id: 'closed-port',
            name: 'Closed Port',
            host: 'github.com',
            port: 9999,
            description: 'Tests a typically closed port',
            expectedResult: 'Port is closed',
            category: 'valid',
        },
        {
            id: 'filtered-port',
            name: 'Filtered Port',
            host: 'microsoft.com',
            port: 25,
            description: 'Tests a typically filtered (firewall blocked) port',
            expectedResult: 'Port is filtered',
            category: 'valid',
        },
        {
            id: 'open-filtered-port',
            name: 'Open|Filtered State',
            host: 'cloudflare.com',
            port: 53,
            description: 'Tests a port in the open|filtered ambiguous state',
            expectedResult: 'Port is either open or filtered',
            category: 'valid',
        },
        {
            id: 'closed-filtered-port',
            name: 'Closed|Filtered State',
            host: 'amazon.com',
            port: 135,
            description: 'Tests a port in the closed|filtered ambiguous state',
            expectedResult: 'Port is either closed or filtered',
            category: 'valid',
        },

        // Error Condition Test Cases
        {
            id: 'invalid-domain',
            name: 'Invalid Domain (Bad DNS)',
            host: 'nonexistentdomain12345.com',
            port: 80,
            description: 'Tests behavior with a non-existent domain',
            expectedResult: 'Error or unknown state',
            category: 'error',
        },
        {
            id: 'invalid-ip',
            name: 'Invalid IP Address Format',
            host: '192.168.1.256',
            port: 80,
            description: 'Tests behavior with an invalid IP address',
            expectedResult: 'Error, invalid input',
            category: 'error',
        },
        {
            id: 'valid-ip-no-host',
            name: 'Valid IP with No Host',
            host: '203.0.113.1',
            port: 80,
            description: 'Tests with a valid but unused IP address (Reserved for documentation)',
            expectedResult: 'Timeout or filtered',
            category: 'error',
        },
        {
            id: 'unreachable-private-ip',
            name: 'Unreachable Private IP',
            host: '10.255.255.255',
            port: 80,
            description: 'Tests with a private IP that is likely unreachable',
            expectedResult: 'Timeout or error',
            category: 'error',
        },
        {
            id: 'malformed-input',
            name: 'Malformed Input',
            host: 'example,com',
            port: 80,
            description: 'Tests with malformed host input (comma instead of period)',
            expectedResult: 'Error, invalid input',
            category: 'error',
        },

        // Special Test Cases
        {
            id: 'ipv6-address',
            name: 'IPv6 Address',
            host: '2001:4860:4860::8888',
            port: 53,
            description: 'Tests with an IPv6 address (Google DNS)',
            expectedResult: 'Depends on IPv6 support',
            category: 'special',
        },
        {
            id: 'loopback-address',
            name: 'Loopback Address',
            host: '127.0.0.1',
            port: 80,
            description: 'Tests with the loopback address',
            expectedResult: 'Depends on local services',
            category: 'special',
        },
        {
            id: 'punycode-domain',
            name: 'Internationalized Domain Name',
            host: 'xn--80akhbyknj4f.xn--p1ai',
            port: 80,
            description: 'Tests with a punycode/IDN domain',
            expectedResult: 'Depends on IDN support',
            category: 'special',
        },
    ];

    // Function to run a specific test
    function runTest(test: TestCase) {
        setSelectedTest(test);
        setCurrentPage('test');
    }

    // Function to handle test completion
    function completeTest(testId: string, success: boolean) {
        setTestResults((prev) => ({
            ...prev,
            [testId]: success,
        }));
    }

    // Function to render test list
    function renderTestList() {
        const categories = {
            valid: 'Valid Host Tests',
            error: 'Error Condition Tests',
            special: 'Special Case Tests',
        };

        return (
            <div className="space-y-8">
                <div>
                    <h1 className="mb-4 text-2xl">Port Checker Automated Test Suite</h1>
                    <p className="mb-4">
                        This page allows you to run through test cases to verify the port checker functionality under
                        various conditions. Click on any test to run it individually, or use the &quot;Run All
                        Tests&quot; button to execute them in sequence.
                    </p>
                    <div className="mb-8 flex space-x-4">
                        <Button onClick={() => runAllTests()}>Run All Tests</Button>
                        <Link href="/port-checker">
                            <Button variant="default">Return to Port Checker</Button>
                        </Link>
                    </div>
                </div>

                {(Object.keys(categories) as Array<keyof typeof categories>).map((category) => (
                    <div key={category} className="rounded-lg border p-4">
                        <h2 className="mb-4 text-xl font-bold">{categories[category]}</h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {testCases
                                .filter((test) => test.category === category)
                                .map((test) => (
                                    <div
                                        key={test.id}
                                        className={`cursor-pointer rounded-lg border p-4 ${
                                            testResults[test.id] === undefined
                                                ? 'border'
                                                : testResults[test.id]
                                                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                                  : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                        }`}
                                        onClick={() => runTest(test)}
                                    >
                                        <h3 className="font-semibold">{test.name}</h3>
                                        <div className="mt-2 text-sm">
                                            <div>
                                                <span className="font-medium">Host:</span> {test.host}
                                            </div>
                                            <div>
                                                <span className="font-medium">Port:</span> {test.port}
                                            </div>
                                        </div>
                                        <p className="mt-2 text-sm">{test.description}</p>
                                        <div className="mt-2 text-sm">
                                            <span className="font-medium">Expected:</span>{' '}
                                            <span className="italic">{test.expectedResult}</span>
                                        </div>
                                        {testResults[test.id] !== undefined && (
                                            <div
                                                className={`mt-2 text-sm font-semibold ${
                                                    testResults[test.id]
                                                        ? 'text-green-600 dark:text-green-400'
                                                        : 'text-red-600 dark:text-red-400'
                                                }`}
                                            >
                                                {testResults[test.id] ? 'PASSED' : 'FAILED'}
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // State for batch testing
    const [currentBatchTestIndex, setCurrentBatchTestIndex] = React.useState(0);
    const [batchResults, setBatchResults] = React.useState<Record<string, boolean>>({});

    // Function to run all tests in sequence
    function runAllTests() {
        setCurrentBatchTestIndex(0);
        setBatchResults({});
        setCurrentPage('batch');
    }

    // Function to handle batch test completion
    function handleBatchTestComplete(testId: string, success: boolean) {
        // Save the result
        setBatchResults((prev) => ({
            ...prev,
            [testId]: success,
        }));

        // Move to the next test or finish
        if(currentBatchTestIndex < testCases.length - 1) {
            setCurrentBatchTestIndex(currentBatchTestIndex + 1);
        }
        else {
            // All tests are complete
            setTestResults(batchResults);
            setCurrentPage('list');
        }
    }

    // Function to render the batch testing view
    function renderBatchTesting() {
        // Ensure a valid test case exists
        if(currentBatchTestIndex >= testCases.length) {
            setCurrentPage('list');
            return null;
        }

        const currentTest = testCases[currentBatchTestIndex];

        // Safety check
        if(!currentTest) {
            setCurrentPage('list');
            return null;
        }

        return (
            <div className="space-y-6">
                <div className="rounded-lg border p-6">
                    <h2 className="mb-2 text-xl">
                        Batch Testing: {currentBatchTestIndex + 1} of {testCases.length}
                    </h2>
                    <div className="mb-4 flex items-center justify-between">
                        <span className="text-lg font-semibold">{currentTest.name}</span>
                        <div className="text-sm">{Object.keys(batchResults).length} tests completed</div>
                    </div>
                    <div className="mb-6 h-2 w-full rounded-full">
                        <div
                            className="h-2 rounded-full border"
                            style={{ width: `${(currentBatchTestIndex / testCases.length) * 100}%` }}
                        ></div>
                    </div>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <span className="font-medium">Host:</span> {currentTest.host}
                        </div>
                        <div>
                            <span className="font-medium">Port:</span> {currentTest.port}
                        </div>
                    </div>
                    <p className="mb-4">{currentTest.description}</p>
                    <div className="mb-6">
                        <span className="font-medium">Expected Result:</span>{' '}
                        <span className="italic">{currentTest.expectedResult}</span>
                    </div>
                    <div className="flex space-x-4">
                        <Button onClick={() => handleBatchTestComplete(currentTest.id, true)}>
                            Mark as Successful
                        </Button>
                        <Button variant="destructive" onClick={() => handleBatchTestComplete(currentTest.id, false)}>
                            Mark as Failed
                        </Button>
                        <Button
                            variant="default"
                            onClick={() => {
                                setCurrentPage('list');
                            }}
                        >
                            Cancel Batch Testing
                        </Button>
                    </div>
                </div>

                <div className="rounded-lg border p-6">
                    <h3 className="mb-4 text-lg font-semibold">Automated Port Checker</h3>
                    <AutomatedPortChecker
                        testCase={{
                            host: currentTest.host,
                            port: currentTest.port,
                        }}
                        onTestComplete={(result) => {
                            console.log('Batch test completed:', result);
                            // Don't auto-mark as complete - let the user decide
                        }}
                        autoRun={true}
                    />
                </div>
            </div>
        );
    }

    // Function to render the current test
    function renderCurrentTest() {
        if(!selectedTest) return null;

        // Handle test completion
        // function handleTestComplete(result: PortCheckResultInterface) {
        //     console.log('Test completed:', result);
        //     // Don't auto-mark as complete - let the user decide
        // }

        return (
            <div className="space-y-6">
                <div className="rounded-lg border p-6">
                    <h2 className="mb-2 text-xl font-bold">Running Test: {selectedTest.name}</h2>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <span className="font-medium">Host:</span> {selectedTest.host}
                        </div>
                        <div>
                            <span className="font-medium">Port:</span> {selectedTest.port}
                        </div>
                    </div>
                    <p className="mb-4">{selectedTest.description}</p>
                    <div className="mb-4">
                        <span className="font-medium">Expected Result:</span>{' '}
                        <span className="italic">{selectedTest.expectedResult}</span>
                    </div>
                    <div className="flex space-x-4">
                        <Button
                            onClick={() => {
                                completeTest(selectedTest.id, true);
                                setCurrentPage('list');
                            }}
                        >
                            Mark as Successful
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                completeTest(selectedTest.id, false);
                                setCurrentPage('list');
                            }}
                        >
                            Mark as Failed
                        </Button>
                        <Button
                            variant="default"
                            onClick={() => {
                                setSelectedTest(null);
                                setCurrentPage('list');
                            }}
                        >
                            Cancel Test
                        </Button>
                    </div>
                </div>

                <div className="rounded-lg border p-6">
                    <h3 className="mb-4 text-lg font-semibold">Automated Port Checker</h3>
                    <AutomatedPortChecker
                        testCase={{
                            host: selectedTest.host,
                            port: selectedTest.port,
                        }}
                        // onTestComplete={handleTestComplete}
                        autoRun={true}
                    />
                </div>
            </div>
        );
    }

    // Render the appropriate view based on current page
    return (
        <div className="container mx-auto px-4 py-8">
            {currentPage === 'list' && renderTestList()}
            {currentPage === 'test' && renderCurrentTest()}
            {currentPage === 'batch' && renderBatchTesting()}
        </div>
    );
}

// Export - Default
export default TestPortCheckerPage;
