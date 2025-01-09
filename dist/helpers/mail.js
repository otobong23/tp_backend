"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeTemplate = void 0;
const react_1 = __importDefault(require("react"));
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
const EmailTemplate = ({ firstName, code }) => {
    return (react_1.default.createElement("div", { style: styles.body },
        react_1.default.createElement("div", { style: styles.container },
            react_1.default.createElement("div", { style: styles.logo },
                react_1.default.createElement("img", { src: 'https://s3-alpha-sig.figma.com/img/6d00/888d/07bdb45817485d418eeb79c74af4bb93?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GxAscHyedFBs3M9799IrxLwbSN2OHTDgs6D8Earhks1me0jCge-x1C2epZYl9DiOmC3m1XtTrZr8rhUZ~fvQZzPqTl6cQ36FrSytSuKREjbT1lUDXjsDI8ihBLti-yWDDN3H6q8Oo7Tu4mYJlXRsJ~uSXF0LYd~COw0E2F9ATiXk-EXxesvTjZvLUj7t2yKk4XzMyETZ4BbmkML7WTDqh5J1d4tiocQZkt7DTT2TvmCF5gx7suFZI7TjalFzgFHTsPo~eYXiZDdP-MtvCaHd5tnWGsi6w-YVMq6k8Zh9a~4Um8A6yBLep~rXJhAKCtynTj-mLFXyWqjssfst-6fmGA__', alt: "logo Icon", style: styles.icon })),
            react_1.default.createElement("h1", { style: styles.h1 },
                "Hi! ",
                firstName),
            react_1.default.createElement("p", { style: styles.p },
                react_1.default.createElement("a", { href: "/" }, "Welcome to TradePhere")),
            react_1.default.createElement("p", { style: styles.p }, "Trade Phere is a trading company where you can be a part of the peer-to-peer exchange community worldwide. Using modern business methods and person-to-person client approach, we offer a unique investment model to traders of bitcoin and other methods."),
            react_1.default.createElement("p", { style: styles.p }, "Verify your email"),
            react_1.default.createElement("h1", { style: styles.h1 }, code),
            react_1.default.createElement("p", { style: styles.p }, "This Code Expires in 10 Minutes"))));
};
exports.default = EmailTemplate;
const WelcomeTemplate = ({ firstName }) => (react_1.default.createElement("div", { style: styles.body },
    react_1.default.createElement("div", { style: styles.container },
        react_1.default.createElement("div", { style: styles.logo },
            react_1.default.createElement("img", { src: 'https://s3-alpha-sig.figma.com/img/6d00/888d/07bdb45817485d418eeb79c74af4bb93?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GxAscHyedFBs3M9799IrxLwbSN2OHTDgs6D8Earhks1me0jCge-x1C2epZYl9DiOmC3m1XtTrZr8rhUZ~fvQZzPqTl6cQ36FrSytSuKREjbT1lUDXjsDI8ihBLti-yWDDN3H6q8Oo7Tu4mYJlXRsJ~uSXF0LYd~COw0E2F9ATiXk-EXxesvTjZvLUj7t2yKk4XzMyETZ4BbmkML7WTDqh5J1d4tiocQZkt7DTT2TvmCF5gx7suFZI7TjalFzgFHTsPo~eYXiZDdP-MtvCaHd5tnWGsi6w-YVMq6k8Zh9a~4Um8A6yBLep~rXJhAKCtynTj-mLFXyWqjssfst-6fmGA__', alt: "logo Icon", style: styles.icon })),
        react_1.default.createElement("h1", { style: styles.h1 },
            "Hi! ",
            firstName),
        react_1.default.createElement("p", { style: styles.p },
            react_1.default.createElement("a", { href: "/" }, "Welcome to TradePhere")),
        react_1.default.createElement("p", { style: styles.p }, "Trade Phere is a trading company where you can be a part of the peer-to-peer exchange community worldwide. Using modern business methods and person-to-person client approach, we offer a unique investment model to traders of bitcoin and other methods."),
        react_1.default.createElement("p", { style: styles.p }, "Welcome to Trade Phere \u2013 where global peer-to-peer exchange meets modern innovation! \uD83C\uDF0D\u2728 Join a thriving community of traders who believe in personalized connections and cutting-edge business methods. Whether you're trading Bitcoin or exploring other investment opportunities, we\u2019re here to empower your journey with a unique model tailored just for you. Let\u2019s build the future of trading, together. \uD83D\uDE80"))));
exports.WelcomeTemplate = WelcomeTemplate;
