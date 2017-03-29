import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';

import {connect} from 'react-redux';

import { Stdout, Stdin } from '../components';

// @connect(state => ({
//
// }))

export default class Terminal extends Component {
  // static propTypes = {
  //   stdout: PropTypes.object.isRequired,
  //   // stdin: PropTypes.object.isRequired,
  //   dispatch: PropTypes.func.isRequired
  // }

  render() {
    return (
      <div>
      </div>
    );
  }
}
