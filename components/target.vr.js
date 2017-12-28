import React from 'react';
import {StyleSheet, View, VrButton} from 'react-vr';

const INNER_POINTS = 100;
const MIDDLE_POINTS = 70;
const OUTER_POINTS = 50;

const PROCESS_HIT_TIMEOUT = 1000;

const Circle = ({color, diameter, offsetZ, onClick, position}) => {
  return (
    <VrButton
      onClick={onClick}
      style={{
        backgroundColor: color,
        borderRadius: diameter/2,
        height: diameter,
        position: 'absolute',
        transform: [
          {translate: [0, 0, offsetZ ? offsetZ : 0]},
        ],
        width: diameter,
      }} />
  );
};

export default class Target extends React.Component {
  state = {
    processingHit: false,
  };

  _onClickInner = (e) => {
    e.stopPropagation();
    this._processHit(INNER_POINTS);
  }

  _onClickMiddle = (e) => {
    e.stopPropagation();
    this._processHit(MIDDLE_POINTS);
  }

  _onClickOuter = (e) => {
    e.stopPropagation();
    this._processHit(OUTER_POINTS);
  }

  _processHit = (points) => {
    const {id, setHit} = this.props;
    const {processingHit} = this.state;
    if (!processingHit) {
      this.setState({processingHit: true}, () => {
        setTimeout(() => {
          setHit(id, points);
        }, PROCESS_HIT_TIMEOUT);
      });
    }
  };

  render() {
    const {diameter, position} = this.props;
    const {processingHit} = this.state;
    return (
      <View style={[
          styles.targetView,
          {transform: [
            {translate: [position.x, position.y, position.z]},
          ]},
        ]}>
        {processingHit ?
          <Circle color="green" diameter={diameter} /> :
          <View 
            style={[styles.targetView, {
            }]}>
            <Circle color="blue" diameter={diameter} onClick={this._onClickOuter} />
            <Circle color="red" diameter={diameter * 0.7} offsetZ={0.001} onClick={this._onClickMiddle} />
            <Circle color="yellow" diameter={diameter * 0.4} offsetZ={0.002} onClick={this._onClickInner} />
          </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  targetView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});
