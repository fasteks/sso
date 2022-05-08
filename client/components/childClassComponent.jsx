import React from 'react'

class ChildClassComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Child',
      clicked: 0
    }

    this.clickWindow = this.clickWindow.bind(this)
    this.focusInput = React.createRef()
  }

  // единственный лайфсайкл метод который позволяет пробрасывать стейты и пропс
  // статический метод React, позволяющий обновлять текущий state.
  // внутри статических методов нет доступа к объекту класса (через this) в котором метод вызван
  // Он должен вернуть объект для обновления состояния или null, чтобы ничего не обновлять.

  // Вызывается при каждом рендере.
  // применяется когда состояние зависит от изменений в пропсах
  static getDerivedStateFromProps(newProps, oldState) {
    console.log('getDerivedStateFromProps', newProps, oldState)
    return null
  }

  // кастомная функция простого счетчика
  clickWindow() {
    this.setState((s) => ({ clicked: s.clicked + 1 }))
  }

  // срабатывает один раз, сразу после рендера компонента.
  componentDidMount() {
    window.addEventListener('click', this.clickWindow)
    console.log('i am alive')

    this.focusInput.current.focus()
  }

  //  срабатывает один раз, перед удалением компонента.
  componentWillUnmount() {
    window.removeEventListener('click', this.clickWindow)
    console.log('i am going to die')
  }

  // срабатывает каждый раз, после обновления компонента, но не при первом рендере
  componentDidUpdate(prevProps, prevState) {
    console.log('props:', prevProps)
    console.log('state:', prevState)
  }

  // логика установки условия при котором компонент может обновляться, на основе пропсов и стэйта
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
        <input
          type="text"
          value={this.state.age}
          ref={this.focusInput}
          onChange={this.changeStateAge}
        />
      </div>
    )
  }
}

export default ChildClassComponent
