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
    alertBanner: {
        backgroundColor: '#fef3c7',
        border: '1px solid #f59e0b',
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
    alertText: {
        color: '#92400e',
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
    urgency: {
        backgroundColor: '#fed7d7',
        border: '1px solid #fc8181',
        borderRadius: '6px',
        padding: '12px',
        textAlign: 'center',
        marginBottom: '20px',
    },
    urgencyText: {
        color: '#c53030',
        fontWeight: '600',
        margin: 0,
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
const TransactionMail = ({ email, transactionId, amount = "Amount not specified", type, coin = "USDT", timestamp = new Date().toLocaleString() }) => {
    const review = 'https://www.rejah.net/admin/transactions';
    const dashboard = 'https://www.rejah.net/admin/dashboard';
    return (React.createElement("div", { style: styles.body },
        React.createElement("div", { style: styles.container },
            React.createElement("div", { style: styles.header },
                React.createElement("div", { style: styles.logo }, "Rejah"),
                React.createElement("div", { style: styles.tagline }, "Peer-to-Peer Trading Platform")),
            React.createElement("div", { style: styles.content },
                React.createElement("div", { style: styles.alertBanner },
                    React.createElement("span", { style: styles.alertIcon }, "\u26A0\uFE0F"),
                    React.createElement("p", { style: styles.alertText }, "Admin Action Required - Transaction Review")),
                React.createElement("p", { style: styles.greeting }, "Hello Admin,"),
                React.createElement("div", { style: styles.transactionCard },
                    React.createElement("h2", { style: styles.transactionTitle }, "\uD83D\uDCE5 Incoming Transaction"),
                    React.createElement("div", { style: styles.transactionId },
                        "ID: ",
                        transactionId),
                    React.createElement("div", { style: styles.transactionDetails },
                        React.createElement("div", { style: styles.detailRow },
                            React.createElement("span", { style: styles.detailLabel }, "User:"),
                            React.createElement("span", { style: styles.detailValue }, email)),
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
                            React.createElement("span", { style: styles.detailLabel }, "Timestamp:"),
                            React.createElement("span", { style: styles.detailValue }, timestamp)),
                        React.createElement("div", { style: styles.detailRow },
                            React.createElement("span", { style: styles.detailLabel }, "Status:"),
                            React.createElement("span", { style: styles.detailValue }, "\u23F3 Pending Review")))),
                React.createElement("div", { style: styles.actionSection },
                    React.createElement("a", { href: review, style: styles.actionButton }, "\uD83D\uDD0D Review Transaction"),
                    React.createElement("a", { href: dashboard, style: styles.secondaryButton }, "\uD83D\uDCCA View Dashboard")),
                React.createElement("p", { style: { fontSize: '0.9rem', color: '#718096', textAlign: 'center', marginTop: '20px' } }, "Please review this transaction promptly to ensure smooth processing for our users.")),
            React.createElement("div", { style: styles.footer },
                React.createElement("p", { style: styles.footerText },
                    React.createElement("strong", null, "Rejah Trading Platform")),
                React.createElement("p", { style: styles.footerText }, "Modern P2P Bitcoin & Cryptocurrency Exchange"),
                React.createElement("p", { style: styles.footerText }, "This is an automated notification. Please do not reply to this email.")))));
};
exports.default = TransactionMail;
