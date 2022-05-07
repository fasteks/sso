import React from 'react'

import ChildClassComponent from './childClassComponent'

class InputClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'alewa',
      toggled: true
    }
    this.changeStateName = this.changeStateName.bind(this)
    this.changeStateAge = this.changeStateAge.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  changeStateName(e) {
    this.setState({ name: e.target.value })
  }

  changeStateAge(e) {
    // eslint-disable-next-line no-debugger
    // debugger
    this.setState({ age: e.target.value })
  }

  toggle() {
    this.setState((s) => ({ toggled: !s.toggled }))
  }

  render() {
    return (
      <div className="p-5 bg-purple-300">
        Class Component Inside
        <div>State: {JSON.stringify(this.state)}</div>
        <div>Name: {this.state.name}</div>
        <div>
          <input type="text" value={this.state.name} onChange={this.changeStateName} />
        </div>
        <div>Age: {this.state.age}</div>
        <div>
          <input type="text" value={this.state.age} onChange={this.changeStateAge} />
        </div>
        <button type="button" onClick={this.toggle} className="p-1 bg-red-500">
          toggle
        </button>
        {this.state.toggled && <ChildClassComponent />}
      </div>
    )
  }
}

export default InputClass
