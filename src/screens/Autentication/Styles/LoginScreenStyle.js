import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    cardContainer: {
        height: 200,
        width: '100%',
        backgroundColor: '#0E7B46',
        borderBottomRightRadius: 80,
        justifyContent: 'center',
        paddingLeft: 20,
        marginBottom: 40
    },
    entrarButton: {
        backgroundColor: '#0E7B46', 
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
        fontSize: 24,
        
    },
    inputContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    inputIconContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: '100%',
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
        color: '#000',
        marginTop: 5,
        textAlign: 'right',
        marginBottom: 20,
        fontSize: 14
    },
    register: {
        color: '#000',
        marginTop: 20,
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 14
    },
   
});