import { TailSpin } from 'react-loader-spinner';
import React, { Component } from 'react';

export default class App extends Component {
	
	render() {
		return (
      <TailSpin ariaLabel="loading" color="#00BFFF" height={80} width={80} />
    );
	}
}
