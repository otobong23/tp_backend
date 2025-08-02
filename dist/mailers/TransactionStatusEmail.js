"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const styles = {
    body: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f5f5',
        margin: 0,
        padding: '20px',
        minHeight: '100vh',
    },
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
    },
    header: {
        backgroundColor: '#1a365d',
        color: '#ffffff',
        padding: '20px',
        textAlign: 'center',
    },
    logo: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    tagline: {
        fontSize: '0.9rem',
        opacity: 0.9,
    },
    content: {
        padding: '30px',
    },
    // Success alert for approved
    successBanner: {
        backgroundColor: '#d1fae5',
        border: '1px solid #34d399',
        borderRadius: '6px',
        padding: '15px',
        marginBottom: '25px',
        display: 'flex',
        alignItems: 'center',
    },
    // Error alert for declined
    errorBanner: {
        backgroundColor: '#fee2e2',
        border: '1px solid #f87171',
        borderRadius: '6px',
        padding: '15px',
        marginBottom: '25px',
        display: 'flex',
        alignItems: 'center',
    },
    alertIcon: {
        marginRight: '10px',
        fontSize: '1.2rem',
    },
    successText: {
        color: '#065f46',
        fontWeight: '600',
        margin: 0,
    },
    errorText: {
        color: '#dc2626',
        fontWeight: '600',
        margin: 0,
    },
    greeting: {
        fontSize: '1.1rem',
        color: '#2d3748',
        marginBottom: '20px',
    },
    transactionCard: {
        backgroundColor: '#f8fafc',
        border: '2px solid #e2e8f0',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
    },
    approvedCard: {
        backgroundColor: '#f0fdf4',
        border: '2px solid #bbf7d0',
    },
    declinedCard: {
        backgroundColor: '#fef2f2',
        border: '2px solid #fecaca',
    },
    transactionTitle: {
        fontSize: '1.3rem',
        fontWeight: 'bold',
        color: '#1a202c',
        marginBottom: '15px',
        textAlign: 'center',
    },
    transactionDetails: {
        display: 'grid',
        gap: '12px',
    },
    detailRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 0',
        borderBottom: '1px solid #e2e8f0',
    },
    detailLabel: {
        fontWeight: '600',
        color: '#4a5568',
    },
    detailValue: {
        color: '#2d3748',
        fontWeight: '500',
    },
    transactionId: {
        backgroundColor: '#edf2f7',
        padding: '12px',
        borderRadius: '6px',
        fontFamily: 'monospace',
        fontSize: '1rem',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2d3748',
        marginBottom: '15px',
    },
    statusBadge: {
        padding: '8px 16px',
        borderRadius: '20px',
        fontWeight: '600',
        fontSize: '0.9rem',
        textAlign: 'center',
        marginBottom: '15px',
    },
    approvedBadge: {
        backgroundColor: '#dcfce7',
        color: '#166534',
        border: '1px solid #bbf7d0',
    },
    declinedBadge: {
        backgroundColor: '#fee2e2',
        color: '#dc2626',
        border: '1px solid #fecaca',
    },
    reasonSection: {
        backgroundColor: '#fef3c7',
        border: '1px solid #f59e0b',
        borderRadius: '6px',
        padding: '15px',
        marginBottom: '20px',
    },
    reasonTitle: {
        color: '#92400e',
        fontWeight: '600',
        marginBottom: '8px',
        fontSize: '1rem',
    },
    reasonText: {
        color: '#78350f',
        margin: 0,
        lineHeight: '1.5',
    },
    nextStepsSection: {
        backgroundColor: '#e0f2fe',
        border: '1px solid #0ea5e9',
        borderRadius: '6px',
        padding: '15px',
        marginBottom: '20px',
    },
    nextStepsTitle: {
        color: '#0c4a6e',
        fontWeight: '600',
        marginBottom: '8px',
        fontSize: '1rem',
    },
    nextStepsList: {
        color: '#075985',
        margin: 0,
        paddingLeft: '20px',
    },
    actionSection: {
        textAlign: 'center',
        marginTop: '25px',
    },
    actionButton: {
        backgroundColor: '#3182ce',
        color: '#ffffff',
        padding: '12px 30px',
        borderRadius: '6px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1rem',
        display: 'inline-block',
        margin: '0 10px 10px 10px',
    },
    successButton: {
        backgroundColor: '#059669',
        color: '#ffffff',
        padding: '12px 30px',
        borderRadius: '6px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1rem',
        display: 'inline-block',
        margin: '0 10px 10px 10px',
    },
    secondaryButton: {
        backgroundColor: '#718096',
        color: '#ffffff',
        padding: '12px 30px',
        borderRadius: '6px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1rem',
        display: 'inline-block',
        margin: '0 10px 10px 10px',
    },
    footer: {
        backgroundColor: '#edf2f7',
        padding: '20px',
        textAlign: 'center',
        fontSize: '0.85rem',
        color: '#718096',
    },
    footerText: {
        margin: '5px 0',
    },
};
const TransactionStatusEmail = ({ email, transactionId, amount = "Amount not specified", type, coin = "USDT", timestamp = new Date().toLocaleString(), status, reason, processingTime = "5-10 minutes" }) => {
    const dashboard = 'https://www.rejah.net/dashboard';
    const transactions = 'https://www.rejah.net/dashboard/tiering/transactions';
    const support = 'https://www.rejah.net/dashboard/support';
    const isApproved = status === 'approved';
    const isDeclined = status === 'declined';
    return (React.createElement("div", { style: styles.body },
        React.createElement("div", { style: styles.container },
            React.createElement("div", { style: styles.header },
                React.createElement("div", { style: styles.logo }, "Rejah"),
                React.createElement("div", { style: styles.tagline }, "Peer-to-Peer Trading Platform")),
            React.createElement("div", { style: styles.content },
                isApproved && (React.createElement("div", { style: styles.successBanner },
                    React.createElement("span", { style: styles.alertIcon }, "\u2705"),
                    React.createElement("p", { style: styles.successText }, "Transaction Approved Successfully!"))),
                isDeclined && (React.createElement("div", { style: styles.errorBanner },
                    React.createElement("span", { style: styles.alertIcon }, "\u274C"),
                    React.createElement("p", { style: styles.errorText }, "Transaction Declined"))),
                React.createElement("p", { style: styles.greeting },
                    "Dear ",
                    email.split('@')[0],
                    ","),
                React.createElement("p", { style: { fontSize: '1rem', color: '#2d3748', marginBottom: '20px', lineHeight: '1.6' } }, isApproved
                    ? `We're pleased to inform you that your ${type.toLowerCase()} transaction has been approved and processed successfully.`
                    : `We regret to inform you that your ${type.toLowerCase()} transaction has been declined after review.`),
                React.createElement("div", { style: {
                        ...styles.transactionCard,
                        ...(isApproved ? styles.approvedCard : styles.declinedCard)
                    } },
                    React.createElement("h2", { style: styles.transactionTitle }, isApproved ? '✅ Transaction Approved' : '❌ Transaction Declined'),
                    React.createElement("div", { style: styles.transactionId },
                        "ID: ",
                        transactionId),
                    React.createElement("div", { style: {
                            ...styles.statusBadge,
                            ...(isApproved ? styles.approvedBadge : styles.declinedBadge)
                        } }, isApproved ? '🎉 APPROVED' : '⚠️ DECLINED'),
                    React.createElement("div", { style: styles.transactionDetails },
                        React.createElement("div", { style: styles.detailRow },
                            React.createElement("span", { style: styles.detailLabel }, "Type:"),
                            React.createElement("span", { style: styles.detailValue },
                                type,
                                " ",
                                coin)),
                        React.createElement("div", { style: styles.detailRow },
                            React.createElement("span", { style: styles.detailLabel }, "Amount:"),
                            React.createElement("span", { style: styles.detailValue },
                                amount,
                                " ",
                                coin)),
                        React.createElement("div", { style: styles.detailRow },
                            React.createElement("span", { style: styles.detailLabel }, "Submitted:"),
                            React.createElement("span", { style: styles.detailValue }, timestamp)),
                        React.createElement("div", { style: styles.detailRow },
                            React.createElement("span", { style: styles.detailLabel }, "Status:"),
                            React.createElement("span", { style: styles.detailValue }, isApproved ? '✅ Approved' : '❌ Declined')),
                        isApproved && (React.createElement("div", { style: styles.detailRow },
                            React.createElement("span", { style: styles.detailLabel }, "Processing Time:"),
                            React.createElement("span", { style: styles.detailValue }, processingTime))))),
                isDeclined && reason && (React.createElement("div", { style: styles.reasonSection },
                    React.createElement("p", { style: styles.reasonTitle }, "\uD83D\uDCCB Reason for Decline:"),
                    React.createElement("p", { style: styles.reasonText }, reason))),
                isApproved && (React.createElement("div", { style: styles.nextStepsSection },
                    React.createElement("p", { style: styles.nextStepsTitle }, "\uD83D\uDCDD What happens next:"),
                    React.createElement("ul", { style: styles.nextStepsList },
                        React.createElement("li", null,
                            "Your transaction will be processed within ",
                            processingTime),
                        React.createElement("li", null, "You'll receive a confirmation once the funds are transferred"),
                        React.createElement("li", null, "You can track the progress in your dashboard")))),
                isDeclined && (React.createElement("div", { style: styles.nextStepsSection },
                    React.createElement("p", { style: styles.nextStepsTitle }, "\uD83D\uDD04 Next Steps:"),
                    React.createElement("ul", { style: styles.nextStepsList },
                        React.createElement("li", null, "Review the decline reason above"),
                        React.createElement("li", null, "You can submit a new transaction with correct information"),
                        React.createElement("li", null, "Contact support if you need assistance"),
                        React.createElement("li", null, "Check our help center for transaction guidelines")))),
                React.createElement("div", { style: styles.actionSection },
                    isApproved && (React.createElement("a", { href: dashboard, style: styles.successButton }, "\uD83D\uDCCA View Dashboard")),
                    React.createElement("a", { href: transactions, style: styles.actionButton }, "\uD83D\uDCCB Transaction History"),
                    isDeclined && (React.createElement("a", { href: support, style: styles.secondaryButton }, "\uD83D\uDCAC Contact Support"))),
                React.createElement("p", { style: { fontSize: '0.9rem', color: '#718096', textAlign: 'center', marginTop: '20px' } }, isApproved
                    ? 'Thank you for using Rejah. We appreciate your business!'
                    : 'We apologize for any inconvenience. Please don\'t hesitate to reach out if you have questions.')),
            React.createElement("div", { style: styles.footer },
                React.createElement("p", { style: styles.footerText },
                    React.createElement("strong", null, "Rejah Trading Platform")),
                React.createElement("p", { style: styles.footerText }, "Modern P2P Bitcoin & Cryptocurrency Exchange"),
                React.createElement("p", { style: styles.footerText }, "This is an automated notification. Please do not reply to this email."),
                React.createElement("p", { style: styles.footerText }, "Need help? Visit our support center or contact us directly.")))));
};
exports.default = TransactionStatusEmail;
