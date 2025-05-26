'use client'; // This adapter uses client-only features

// Dependencies - Flow
import { BaseFlowAdapter } from '@project/app/(main-layout)/tools/_adapters/BaseFlowAdapter';
import { FlowErrorResult } from '@project/app/(main-layout)/tools/_adapters/FlowErrorHandler';
import { ToolErrorMappingUtilities } from '@project/app/(main-layout)/tools/_adapters/ToolErrorMappingUtilities';

// Dependencies - Types
import { FlowExecutionErrorInterface } from '@project/source/modules/flow/FlowService';
import { WebSocketViaSharedWorkerContextInterface } from '@structure/source/api/web-sockets/providers/WebSocketViaSharedWorkerProvider';
import {
    SslTlsInputInterface,
    SslTlsOutputInterface,
    SslTlsResultItemInterface,
    SslTlsContentPart,
} from '@project/app/(main-layout)/tools/ssl-tls-checker/_types/SslTlsTypes';

// Dependencies - Services
import {
    SslTlsFlowService,
    SslTlsClientInputInterface,
} from '@project/app/(main-layout)/tools/ssl-tls-checker/_api/SslTlsFlowService';

// SSL/TLS Adapter
export class SslTlsAdapter extends BaseFlowAdapter<
    SslTlsInputInterface,
    SslTlsOutputInterface,
    SslTlsResultItemInterface,
    SslTlsFlowService
> {
    // Constructor
    constructor(
        webSocketViaSharedWorker: WebSocketViaSharedWorkerContextInterface,
        onResultItem: (resultItem: SslTlsResultItemInterface) => void,
    ) {
        super(webSocketViaSharedWorker, SslTlsFlowService, onResultItem);
    }
    // Get the adapter name
    protected getAdapterName(): string {
        return 'SslTlsAdapter';
    }

    // Create the initial status item
    protected createInitialStatusItem(input: SslTlsInputInterface): SslTlsResultItemInterface {
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
        input: SslTlsInputInterface,
        message: string,
        errorCode?: string,
    ): SslTlsResultItemInterface {
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
    protected processFlowOutput(output: SslTlsOutputInterface): void {
        const contentParts: SslTlsContentPart[] = [];
        let displayText = '';

        // Certificate basic info
        const subject = output.certificate.subject;
        const issuer = output.certificate.issuer;
        const validation = output.validation;

        // Main status
        const isValid = validation.isValid && !validation.isExpired;
        contentParts.push({
            type: 'badge',
            variant: isValid ? 'result-positive' : 'result-negative',
            content: isValid
                ? 'Valid Certificate'
                : validation.isExpired
                  ? 'Expired Certificate'
                  : 'Invalid Certificate',
        });

        // Certificate details
        if(subject.commonName) {
            contentParts.push({
                type: 'text',
                content: '\nCommon Name: ',
            });
            contentParts.push({
                type: 'badge',
                variant: 'domain',
                content: subject.commonName,
            });
        }

        if(issuer.commonName) {
            contentParts.push({
                type: 'text',
                content: '\nIssued By: ',
            });
            contentParts.push({
                type: 'text',
                content: issuer.commonName,
            });
        }

        // Validity dates
        const notBefore = new Date(output.certificate.notBefore);
        const notAfter = new Date(output.certificate.notAfter);

        contentParts.push({
            type: 'text',
            content: '\nValid From: ',
        });
        contentParts.push({
            type: 'badge',
            variant: 'date',
            content: notBefore.toLocaleDateString(),
        });

        contentParts.push({
            type: 'text',
            content: '\nValid Until: ',
        });
        contentParts.push({
            type: 'badge',
            variant: validation.isExpired ? 'result-negative' : 'date',
            content: notAfter.toLocaleDateString(),
        });

        // Days until expiry
        if(!validation.isExpired) {
            contentParts.push({
                type: 'text',
                content: '\nDays Until Expiry: ',
            });
            contentParts.push({
                type: 'badge',
                variant: validation.daysUntilExpiry <= 30 ? 'result-negative' : 'default',
                content: validation.daysUntilExpiry.toString(),
            });
        }

        // Security info
        contentParts.push({
            type: 'text',
            content: '\nTLS Version: ',
        });
        contentParts.push({
            type: 'text',
            content: output.connectionInfo.tlsVersion,
        });

        contentParts.push({
            type: 'text',
            content: '\nSecurity Level: ',
        });
        contentParts.push({
            type: 'badge',
            variant:
                output.connectionInfo.securityLevel === 'HIGH'
                    ? 'result-positive'
                    : output.connectionInfo.securityLevel === 'MEDIUM'
                      ? 'default'
                      : 'result-negative',
            content: output.connectionInfo.securityLevel,
        });

        // Key information
        contentParts.push({
            type: 'text',
            content: '\nKey Algorithm: ',
        });
        contentParts.push({
            type: 'text',
            content: `${output.certificate.publicKeyAlgorithm} (${output.certificate.keySize} bits)`,
        });

        contentParts.push({
            type: 'text',
            content: '\nSignature Algorithm: ',
        });
        contentParts.push({
            type: 'text',
            content: output.certificate.signatureAlgorithm,
        });

        // Fingerprints
        contentParts.push({
            type: 'text',
            content: '\nSHA-256 Fingerprint: ',
        });
        contentParts.push({
            type: 'text',
            content: output.certificate.fingerprint.sha256,
        });

        // Subject Alternative Names
        if(output.certificate.extensions.subjectAlternativeNames?.length) {
            contentParts.push({
                type: 'text',
                content: '\nAlternative Names: ',
            });
            contentParts.push({
                type: 'text',
                content: output.certificate.extensions.subjectAlternativeNames.join(', '),
            });
        }

        // Warnings
        if(validation.warnings.length > 0) {
            validation.warnings.forEach(function (warning) {
                contentParts.push({
                    type: 'text',
                    content: `\n⚠ ${warning}`,
                });
            });
        }

        // Errors
        if(validation.errors.length > 0) {
            validation.errors.forEach(function (error) {
                contentParts.push({
                    type: 'text',
                    content: `\n❌ ${error}`,
                });
            });
        }

        // Response time
        contentParts.push({
            type: 'text',
            content: '\nResponse Time: ',
        });
        contentParts.push({
            type: 'text',
            content: `${output.elapsedTimeMs}ms`,
        });

        // Create display text for copying
        displayText = `SSL/TLS Certificate Check for ${output.host}:${output.port}\n\n`;
        displayText += `Status: ${isValid ? 'Valid' : 'Invalid'}\n`;
        if(subject.commonName) displayText += `Common Name: ${subject.commonName}\n`;
        if(issuer.commonName) displayText += `Issued By: ${issuer.commonName}\n`;
        displayText += `Valid From: ${notBefore.toLocaleDateString()}\n`;
        displayText += `Valid Until: ${notAfter.toLocaleDateString()}\n`;
        if(!validation.isExpired) displayText += `Days Until Expiry: ${validation.daysUntilExpiry}\n`;
        displayText += `TLS Version: ${output.connectionInfo.tlsVersion}\n`;
        displayText += `Security Level: ${output.connectionInfo.securityLevel}\n`;
        displayText += `Key Algorithm: ${output.certificate.publicKeyAlgorithm} (${output.certificate.keySize} bits)\n`;
        displayText += `Signature Algorithm: ${output.certificate.signatureAlgorithm}\n`;
        displayText += `SHA-256 Fingerprint: ${output.certificate.fingerprint.sha256}\n`;

        if(output.certificate.extensions.subjectAlternativeNames?.length) {
            displayText += `Alternative Names: ${output.certificate.extensions.subjectAlternativeNames.join(', ')}\n`;
        }

        if(validation.warnings.length > 0) {
            displayText += `\nWarnings:\n${validation.warnings.map((w) => `- ${w}`).join('\n')}\n`;
        }

        if(validation.errors.length > 0) {
            displayText += `\nErrors:\n${validation.errors.map((e) => `- ${e}`).join('\n')}\n`;
        }

        displayText += `\nResponse Time: ${output.elapsedTimeMs}ms`;

        // Emit the result
        this.onResultItem({
            content: contentParts,
            text: displayText,
            host: output.host,
            port: output.port,
            certificate: output.certificate,
            connectionInfo: output.connectionInfo,
            validation: output.validation,
            serverName: output.serverName,
            elapsedTimeMs: output.elapsedTimeMs,
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
    public async performSslTlsCheck(host: string, port: number, region: string, timeoutMs?: number): Promise<void> {
        const input: SslTlsClientInputInterface = {
            host: host,
            port: port,
            region: region,
            timeoutMs: timeoutMs,
        };

        await this.executeFlow(input);
    }
}
