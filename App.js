/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
  Alert,
  Button,
} from 'react-native';
import WebView from 'react-native-webview';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const STATIC_WEB_URL = 'http://localhost:3000';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const webViewRef = useRef(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  /**
   * window.ReactNativeWebView.postMessage accepts one argument, data
   * which will be available on the event object, event.nativeEvent.data. data must be a string
   */

  const handleMessage = message => {
    Alert.alert(message.nativeEvent.data);
  };

  const sendMessage = () => {
    if (webViewRef.current) {
      webViewRef.current.postMessage('Hi from Mobile');
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Button title={'Hello'} onPress={sendMessage} />
      <View style={styles.container}>
        <WebView
          source={{uri: STATIC_WEB_URL}}
          startInLoadingState={true}
          renderLoading={() => <ActivityIndicator />}
          onMessage={handleMessage}
          ref={webViewRef} // Assign webview ref to the `webViewRef` variable while initial rendering
          onError={syntheticEvent => {
            const {nativeEvent} = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
