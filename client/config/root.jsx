import React from 'react'
import { Provider, useSelector } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect, StaticRouter } from 'react-router-dom'

import store, { history } from '../redux'

import Dummy from '../components/dummy'
import LoginForm from '../components/login'
import NotFound from '../components/404'

import Startup from './startup'

const OnlyAnonymousRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.auth.user)
  const token = useSelector((state) => state.token)
  const func = (props) => {
    if (!!user && !!user.name && !!token) <Redirect to={{ pathname: '/' }} />
    return <Component {...props} />
  }
  return <Route {...rest} render={func} />
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((s) => s.auth)

  const func = (props) => {
    // if (!!auth.user && !!auth.token && auth.user.role?.includes('admin')) {
    //   return <Component {...props} />
    // }

    if (!!auth.user?._id && !!auth.token) {
      return <Component {...props} />
    }

    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    )
  }

  return <Route {...rest} render={func} />
}

const RouterSelector = (props) =>
  typeof window !== 'undefined' ? <ConnectedRouter {...props} /> : <StaticRouter {...props} />

const RootComponent = (props) => {
  return (
    <Provider store={store}>
      <RouterSelector history={history} location={props.location} context={props.context}>
        <Startup>
          <Switch>
            <PrivateRoute exact path="/dummy" component={Dummy} />
            <Route exact path="/" component={LoginForm} />
            <OnlyAnonymousRoute exact path="/anonymous-route" component={LoginForm} />
            <Route component={NotFound} />
          </Switch>
        </Startup>
      </RouterSelector>
    </Provider>
  )
}

export default RootComponent
