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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#fff',
    },
    container: {
        textAlign: 'center',
        paddingBlock: '20px'
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    icon: {
        width: '150px',
        margin: '20px auto',
    },
    h1: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    p: {
        fontSize: '0.9rem',
        color: '#555',
        marginBottom: '20px',
        lineHeight: '1.5',
    },
    a: {
        color: '#fff',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textDecoration: 'underline',
        cursor: 'pointer',
    },
};
const EmailTemplate = ({ username, code }) => {
    return (React.createElement("div", { style: styles.body },
        React.createElement("div", { style: styles.container },
            React.createElement("div", { style: styles.logo },
                React.createElement("img", { src: 'https://res.cloudinary.com/dxet6crme/image/upload/v1748654965/Frame-2_egfoww.svg', alt: "logo Icon", style: styles.icon })),
            React.createElement("h1", { style: styles.h1 },
                "Hi! ",
                username),
            React.createElement("p", { style: styles.p },
                React.createElement("a", { href: "https://rejah.net/" }, "Welcome to Reja")),
            React.createElement("p", { style: styles.p }, "Reja is a trading company where you can be a part of the peer-to-peer exchange community worldwide. Using modern business methods and person-to-person client approach, we offer a unique investment model to traders of bitcoin and other methods."),
            React.createElement("p", { style: styles.p }, "Reset Code"),
            React.createElement("h1", { style: styles.h1 }, code),
            React.createElement("p", { style: styles.p }, "This Code Expires in 10 Minutes"))));
};
exports.default = EmailTemplate;
