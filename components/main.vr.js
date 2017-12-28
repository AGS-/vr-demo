import React from 'react';
import {StyleSheet, View} from 'react-vr';

import Start from './start.vr';
import Target from './target.vr';

const NUMBER_OF_TARGETS = 5;

export default class Main extends React.Component {
  state = {
    gameInProgress: false,
    targets: [],
    score: null,
  };

  _generateRandomNumber = (min, max) => (Math.random() * (max - min) + min)

  _getRemainingTargetCount = () => {
    const {targets} = this.state;
    return targets.filter(t => t.isHit === false).length;
  }

  _startGame = () => {
    this.setState({
      gameInProgress: true,
      score: 0,
    }, () => {
      this._setTargets();
    });
  }

  _setHit = (id, points) => {
    const {score, targets} = this.state;
    const target = targets[id];
    target.isHit = true;
    targets[id] = target;
    this.setState({
      gameInProgress: this._getRemainingTargetCount() > 0,
      score: score + points,
      targets,
    });
  }

  _setTargets = () => {
    const targets = [];
    for (i = 0; i < NUMBER_OF_TARGETS; i++) {
      targets.push({
        diameter: this._generateRandomNumber(0.3, 0.8),
        id: String(i),
        isHit: false,
        position: {
          x: this._generateRandomNumber(-1, 1),
          y: this._generateRandomNumber(-1, 1),
          z: this._generateRandomNumber(-4, -1.5),
        },
      });
    }
    this.setState({targets})
  };

  render () {
    const {gameInProgress, score, targets} = this.state;
    return (
      <View style={styles.mainView}>
        {!gameInProgress && <Start onClick={this._startGame} score={score} />}
        {targets.map((target) => {
          const {diameter, id, isHit, position} = target;
          if (!isHit) {
            return (
              <Target id={id} key={id} diameter={diameter} position={position} setHit={this._setHit}/>
            );
          }
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
