// Dependencies - Types
import {
    SslTlsCheckerFlowExecutionInterface,
    SslTlsCheckerFlowService,
    SslTlsCheckerClientInputInterface,
} from '@project/app/(main-layout)/tools/ssl-tls-checker/_api/SslTlsCheckerFlowService';
import {
    SslTlsCheckerResultItemInterface,
    SslTlsCheckerContentPart,
} from '@project/app/(main-layout)/tools/ssl-tls-checker/_types/SslTlsCheckerTypes';
import { WebSocketViaSharedWorkerContextInterface } from '@structure/source/api/web-sockets/providers/WebSocketViaSharedWorkerProvider';

// Dependencies - Base Classes
import { FlowErrorResult } from '@project/app/(main-layout)/tools/_adapters/FlowErrorHandler';
import { BaseFlowAdapter } from '@project/app/(main-layout)/tools/_adapters/BaseFlowAdapter';
import { ToolErrorMappingUtilities } from '@project/app/(main-layout)/tools/_adapters/ToolErrorMappingUtilities';
import { FlowExecutionErrorInterface } from '@project/app/_modules/flow/FlowService';

// SslTlsCheckerAdapter
export class SslTlsCheckerAdapter extends BaseFlowAdapter<
    SslTlsCheckerClientInputInterface,
    SslTlsCheckerFlowExecutionInterface['output'],
    SslTlsCheckerResultItemInterface,
    SslTlsCheckerFlowService
> {
    // Constructor
    constructor(
        webSocketViaSharedWorker: WebSocketViaSharedWorkerContextInterface,
        onResultItem: (resultItem: SslTlsCheckerResultItemInterface) => void,
    ) {
        super(webSocketViaSharedWorker, SslTlsCheckerFlowService, onResultItem);
    }
    // Get the adapter name
    protected getAdapterName(): string {
        return 'SslTlsCheckerAdapter';
    }

    // Create the initial status item
    protected createInitialStatusItem(input: SslTlsCheckerClientInputInterface): SslTlsCheckerResultItemInterface {
        return {
            content: [
                {
                    type: 'text',
                    content: `Checking SSL/TLS certificate for ${input.host}:${input.port}...`,
                },
            ],
            text: `Checking SSL/TLS certificate for ${input.host}:${input.port}...`,
            host: input.host,
            port: input.port,
            isFinal: false,
            isSuccess: false,
        };
    }

    // Create an error status item
    protected createErrorStatusItem(
        input: SslTlsCheckerClientInputInterface,
        message: string,
        errorCode?: string,
    ): SslTlsCheckerResultItemInterface {
        return {
            content: [
                {
                    type: 'text',
                    content: message,
                },
            ],
            text: message,
            host: input.host,
            port: input.port,
            errorCode: errorCode,
            isFinal: true,
            isSuccess: false,
        };
    }

    // Process the flow output
    protected processFlowOutput(
        output: SslTlsCheckerFlowExecutionInterface['output'],
        input: SslTlsCheckerClientInputInterface,
    ): void {
        // Check if there's an error in the output
        if(output?.error) {
            // Clean up the error message for display
            let errorMessage = output.error;

            // Extract meaningful error message
            if(errorMessage.includes('wrong version number')) {
                errorMessage = 'No SSL/TLS service found on this port. The server may not support HTTPS.';
            }
            else if(errorMessage.includes('connection refused')) {
                errorMessage = 'Connection refused. The server may be down or not accepting connections.';
            }
            else if(errorMessage.includes('timeout')) {
                errorMessage = 'Connection timed out. The server may be slow to respond.';
            }
            else {
                errorMessage =
                    'SSL/TLS handshake failed. The certificate may be invalid or the port may not support SSL/TLS.';
            }

            this.onResultItem({
                content: [
                    { type: 'badge', variant: 'result-negative', content: 'Error' },
                    { type: 'text', content: `: ${errorMessage}` },
                ],
                text: errorMessage,
                host: input.host,
                port: input.port,
                isFinal: true,
                isSuccess: false,
            });
            return;
        }

        // Check if output has required certificate data
        if(!output?.subject || !output?.issuer) {
            // Handle missing data case
            this.onResultItem({
                content: [{ type: 'text', content: 'Failed to retrieve SSL/TLS certificate information.' }],
                text: 'Failed to retrieve SSL/TLS certificate information.',
                host: input.host,
                port: input.port,
                isFinal: true,
                isSuccess: false,
            });
            return;
        }

        const contentParts: SslTlsCheckerContentPart[] = [];
        let displayText = '';

        // Calculate if certificate is expired and days until expiry
        const validFromDate = new Date(output.validFrom!);
        const validToDate = new Date(output.validTo!);
        const now = new Date();
        const isExpired = now > validToDate;
        const daysUntilExpiry = Math.ceil((validToDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        // Main status
        const isValid = output.isValidHostname && !isExpired;
        contentParts.push({
            type: 'badge',
            variant: isValid ? 'result-positive' : 'result-negative',
            content: isValid
                ? 'Valid Certificate'
                : isExpired
                  ? 'Expired Certificate'
                  : !output.isValidHostname
                    ? 'Invalid Hostname'
                    : 'Invalid Certificate',
        });

        // Subject (Common Name)
        contentParts.push({
            type: 'text',
            content: '\nSubject: ',
        });
        contentParts.push({
            type: 'badge',
            variant: 'domain',
            content: output.subject,
        });

        // Issuer
        contentParts.push({
            type: 'text',
            content: '\nIssued By: ',
        });
        contentParts.push({
            type: 'text',
            content: output.issuer,
        });

        // Validity dates
        contentParts.push({
            type: 'text',
            content: '\nValid From: ',
        });
        contentParts.push({
            type: 'badge',
            variant: 'date',
            content: validFromDate.toLocaleDateString(),
        });

        contentParts.push({
            type: 'text',
            content: '\nValid Until: ',
        });
        contentParts.push({
            type: 'badge',
            variant: isExpired ? 'result-negative' : 'date',
            content: validToDate.toLocaleDateString(),
        });

        // Days until expiry
        if(!isExpired) {
            contentParts.push({
                type: 'text',
                content: '\nDays Until Expiry: ',
            });
            contentParts.push({
                type: 'badge',
                variant: daysUntilExpiry <= 30 ? 'result-negative' : 'default',
                content: daysUntilExpiry.toString(),
            });
        }

        // Hostname validation
        contentParts.push({
            type: 'text',
            content: '\nHostname Valid: ',
        });
        contentParts.push({
            type: 'badge',
            variant: output.isValidHostname ? 'result-positive' : 'result-negative',
            content: output.isValidHostname ? 'Yes' : 'No',
        });

        // Subject Alternative Names
        if(output.subjectAltNames?.length) {
            contentParts.push({
                type: 'text',
                content: '\nAlternative Names: ',
            });
            contentParts.push({
                type: 'text',
                content: output.subjectAltNames.join(', '),
            });
        }

        // Create display text for copying
        displayText = `SSL/TLS Certificate Check for ${input.host}:${input.port}\n\n`;
        displayText += `Status: ${isValid ? 'Valid' : 'Invalid'}\n`;
        displayText += `Subject: ${output.subject}\n`;
        displayText += `Issued By: ${output.issuer}\n`;
        displayText += `Valid From: ${validFromDate.toLocaleDateString()}\n`;
        displayText += `Valid Until: ${validToDate.toLocaleDateString()}\n`;
        if(!isExpired) displayText += `Days Until Expiry: ${daysUntilExpiry}\n`;
        displayText += `Hostname Valid: ${output.isValidHostname ? 'Yes' : 'No'}\n`;

        if(output.subjectAltNames?.length) {
            displayText += `Alternative Names: ${output.subjectAltNames.join(', ')}\n`;
        }

        // Emit the result
        this.onResultItem({
            content: contentParts,
            text: displayText,
            host: input.host,
            port: input.port,
            subject: output.subject,
            issuer: output.issuer,
            validFrom: output.validFrom,
            validTo: output.validTo,
            subjectAltNames: output.subjectAltNames,
            isValidHostname: output.isValidHostname,
            isFinal: true,
            isSuccess: isValid,
        });
    }

    // Process tool-specific errors
    protected processToolSpecificError(error: FlowExecutionErrorInterface): FlowErrorResult | null {
        // Map common SSL/TLS errors
        const errorMappings = [
            {
                keywords: ['connection refused', 'refused'],
                message: 'Connection refused - the server may be down or not accepting connections on this port',
                code: 'CONNECTION_REFUSED',
            },
            {
                keywords: ['timeout', 'timed out'],
                message: 'Connection timed out - the server may be slow to respond or unreachable',
                code: 'TIMEOUT',
            },
            {
                keywords: ['certificate', 'cert', 'ssl', 'tls'],
                message: 'SSL/TLS certificate error - the certificate may be invalid, expired, or not trusted',
                code: 'CERTIFICATE_ERROR',
            },
            {
                keywords: ['handshake', 'protocol'],
                message: 'SSL/TLS handshake failed - incompatible protocols or cipher suites',
                code: 'HANDSHAKE_FAILED',
            },
            {
                keywords: ['host not found', 'name resolution'],
                message: 'Domain name could not be resolved - check the hostname',
                code: 'DNS_RESOLUTION_FAILED',
            },
            {
                keywords: ['network unreachable', 'unreachable'],
                message: 'Network unreachable - check your internet connection',
                code: 'NETWORK_UNREACHABLE',
            },
        ];

        // Map common SSL/TLS errors using the custom patterns
        const sslTlsErrorPatterns = ToolErrorMappingUtilities.createCustomErrorPatterns(
            errorMappings.map((mapping) => ({
                pattern: new RegExp(mapping.keywords.join('|'), 'i'),
                errorCode: mapping.code,
                message: mapping.message,
            })),
        );

        return ToolErrorMappingUtilities.processErrorWithPatterns(error, sslTlsErrorPatterns);
    }

    // Public method to perform SSL/TLS check
    public async checkSslTlsCertificate(
        host: string,
        port: number,
        country: string,
        timeoutMs?: number,
    ): Promise<void> {
        const input: SslTlsCheckerClientInputInterface = {
            host: host,
            port: port,
            region: country,
            timeoutMs: timeoutMs,
        };

        await this.executeFlow(input);
    }
}
