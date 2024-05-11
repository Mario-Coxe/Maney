import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D9D9D9',
    },
    cardContainer: {
        height: 200,
        width: '100%',
        backgroundColor: '#0077B6',
        borderBottomRightRadius: 80,
        justifyContent: 'center',
        paddingLeft: 20,
        marginBottom: 40
    },
    entrarButton: {
        backgroundColor: '#0077B6', // Cor de fundo desejada
        padding: 10,
        height: 45,
        borderRadius: 5,
        alignItems: 'center',
    },

    entrarButtonText: {
        color: '#fff', 
        fontSize: 14,
    
    },
    loginText: {
        color: '#fff',
        fontSize: 14,
    },
    bemvindoText: {
        color: '#fff',
        fontSize: 24
    },
    inputContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    inputIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
    },
    inputIcon: {
        marginRight: 10,
    },
    passwordIcon: {

        right: 10,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 14,
    },
    forgotPasswordText: {
        color: 'blue',
        marginTop: 5,
        textAlign: 'right',
        marginBottom: 20,
        fontSize: 14
    },
   
});