import React from 'react'

class ChildClassComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Child',
      clicked: 0
    }

    this.clickWindow = this.clickWindow.bind(this)
  }

  clickWindow() {
    this.setState((s) => ({ clicked: s.clicked + 1 }))
  }

  componentDidMount() {
    window.addEventListener('click', this.clickWindow)
    console.log('i am alive')
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.clickWindow)
    console.log('i am going to die')
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('props:', prevProps)
    console.log('state:', prevState)
  }

  // логика условия при котором компонент должен обновиться
  shouldComponentUpdate(newProps, newState) {
    console.log('new props:', newProps)
    console.log('new state:', newState)
    return newState.clicked % 2 === 0
  }

  render() {
    return (
      <div className="mt-5 p-5 bg-yellow-200">
        <p>{this.state.title} Class Component</p>
        <p>Click counter: {this.state.clicked} </p>
      </div>
    )
  }
}

export default ChildClassComponent
