import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const MessageAlert = ({ type, message }) => {
  const [isVisible, setIsVisible] = useState(true);
  const fadeAnim = useState(new Animated.Value(1))[0];

  const displayDuration = 3000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, displayDuration);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        type === 'success' ? styles.success : styles.error,
        { opacity: fadeAnim },
      ]}
    >
      <Text style={styles.messageText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'center',
    maxWidth: '80%',
  },
  success: {
    backgroundColor: '#4BB543',
  },
  error: {
    backgroundColor: '#FF6347',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins_600SemiBold',
  },
});

export default MessageAlert;
