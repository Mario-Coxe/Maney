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

  backButton: {
    position: 'absolute',
    top: 40,
    left: 350,
    zIndex: 1,
  },

  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25
  },
  otpInput: {
    width: 60,
    height: 60,
    borderRadius: 5,
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 5,
    backgroundColor: '#D9D9D9',
    color: '#000'
  },

});