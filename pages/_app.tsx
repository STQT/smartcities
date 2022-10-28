import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import "assets/css/index.css"
import { store, useAppDispatch } from "store"

import { useEffect } from "react"
import { setLoggedIn, setUser } from "../store/slices/main"
import { isLoggedIn } from "axios-jwt"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import moment from "moment"
import "moment/locale/ru"

import { GoogleOAuthProvider } from "@react-oauth/google"
import { GOOGLE_CLIENT_ID } from "../shared/constants"
import { USER } from "../services/api"

moment.locale("ru")

const AuthChecker = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isLoggedIn()) {
      dispatch(setLoggedIn())

      USER.getCurrent().then((res) => {
        dispatch(setUser(res.data))
      })
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

export default App
