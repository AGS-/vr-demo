import React from 'react';
import {StyleSheet, Text, View, VrButton} from 'react-vr';

export default ({onClick, score}) => {
  const mainText = score === null ? 'PRESS START' : `SCORE: ${score}`;
  return (
    <View style={styles.startView}>
      <Text style={styles.mainText}>{mainText}</Text>
      <Text style={styles.insertCoinText}>{'INSERT A COIN TO CONTINUE'}</Text>
      <VrButton onClick={onClick} style={styles.startButton}>
        <Text style={styles.startButtonText}>{'START'}</Text>
      </VrButton>
    </View>
  );
}

const styles = StyleSheet.create({
  insertCoinText: {
    fontSize: 0.05,
    textAlign: 'center',
  },
  mainText: {
    fontSize: 0.08,
    textAlign: 'center',
  },
  startButton: {
    alignItems: 'center',
    backgroundColor: 'teal',
    height: 0.1,
    justifyContent: 'center',
    marginTop: 0.05,
    width: 0.5,
  },
  startButtonText: {
    fontSize: 0.08,
  },
  startView: {
    alignItems: 'center',
    backgroundColor: 'gray',
    justifyContent: 'center',
    padding: 0.05,
    position: 'absolute',
    transform: [
      {translate: [0, 0, -1]},
    ],
  },
});
