import type { AppProps } from "next/app"
import Router from "next/router"
/*@ts-ignore*/
import withYM from "next-ym"
import { Provider } from "react-redux"
import "assets/css/index.css"
import { store, useAppDispatch } from "store"

import { useEffect } from "react"
import { logOut, setLoggedIn, setUser } from "../store/slices/main"
import { isLoggedIn } from "axios-jwt"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import moment from "moment"
import "moment/locale/ru"
import "moment/locale/az"
import "moment/locale/uz-latn"
import "moment/locale/tr"
import "moment/locale/kk"

import { GoogleOAuthProvider } from "@react-oauth/google"
import { GOOGLE_CLIENT_ID } from "../shared/constants"
import { USER } from "services/api"

moment.locale("en")

const AuthChecker = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isLoggedIn()) {
      dispatch(setLoggedIn())

      USER.getCurrent().then((res) => {
        dispatch(setUser(res.data))
      })
    } else {
      dispatch(logOut())
    }
  }, [dispatch])

  return <></>
}

// @ts-ignore
function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AuthChecker />
        <Component {...pageProps} />
        <ToastContainer />
        <div className={"mt-12"} />
      </GoogleOAuthProvider>
    </Provider>
  )
}

export default withYM("91085646", Router)(App)
