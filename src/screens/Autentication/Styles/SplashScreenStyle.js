import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E7B46',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150, 
        height: 150,
        resizeMode: 'contain', 
    },
    text: {
        fontSize: 24,
        color: 'white',
        marginTop: 1,
    },
    grayText: {
        color: '#fff',
        fontSize: 15
    },
});
