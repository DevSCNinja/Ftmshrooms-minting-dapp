import { makeStyles } from '@material-ui/core/styles';

const globalUseStyles = makeStyles(() => ({
    mintButton: {
        color: '#fff',
        background: '#006b94',
        border: '1px solid #006b94',
        marginTop: 10,
        fontSize: 20,
        letterSpacing: 10,
        fontWeight: 700,
        '&:hover': {
            background: '#00445f',
            color: '#fff',
            borderColor: "#00445f"
        },
        '&:disabled': {
            color: 'transparent',
            background: '#004964',
            border: '1px solid #004964',
        },
        '& span': {
            color: "#fff",
            width: 20,
            height: 20
        }
    },
    connectButton: {
        color: '#fff',
        background: '#006b94',
        border: '1px solid #006b94',
        fontSize: 18,
        letterSpacing: 4,
        fontWeight: 700,
        borderRadius: 30,
        paddingLeft: 20,
        paddingRight: 20,
        '&:hover': {
            background: '#00445f',
            color: '#fff',
            borderColor: "#00445f"
        },
        '&:disabled': {
            color: '#fff',
            background: '#006b94',
            border: '1px solid #006b94',
        }
    },
    greentButton: {
        color: '#fff',
        background: '#006b94',
        border: '1px solid #004964 !important',
        width: 30,
        '&:hover': {
            background: '#00445f',
            color: '#fff',
            borderColor: "#00445f"
        },
        '&:disabled': {
            color: 'transparent',
            background: '#004964',
            border: '1px solid #004964',
        },
        '& span': {
            color: "#fff",
            width: 20,
            height: 20
        }
    },
    totalText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 15,
        letterSpacing: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    alertTitle: {
        fontSize: 42,
        color: "#333",
        marginBottom: 15,
        letterSpacing: 1,
        fontWeight: 900,
        fontFamily: "Roboto Slab"
    },
    alertText: {
        fontSize: 16,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "#333",
        marginBottom: 15,
        letterSpacing: 1
    },
    amountLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        marginTop: 10,
        marginBottom: 10,
        letterSpacing: 1
    },
    amountText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#fff",
        marginTop: 5,
        marginBottom: 10,
        letterSpacing: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    amountCount: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
        letterSpacing: 1
    },
    balanceLabel: {
        fontSize: 14,
        fontWeight: 500,
        color: "#fff",
        letterSpacing: 1
    },
    balanceText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        letterSpacing: 1,
        display: "flex",
        alignItems: "center",
        '& span': {
            fontSize: 14
        }

    },
    tooltipTitle: {
        fontSize: 14,
        fontFamily: "Roboto Slab",
        fontWeight: 500,
        color: "#fff"
    },
    tooltipText: {
        fontSize: 12,
        fontFamily: "Roboto Slab",
        fontWeight: 200,
        color: "#fff",
        lineHeight: 2
    }
}));

export default globalUseStyles