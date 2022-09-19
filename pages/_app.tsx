import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import "assets/css/index.css"
import { store, useAppDispatch } from "store"

import { useEffect } from "react"
import { setLoggedIn } from "../store/slices/main"
import { isLoggedIn } from "axios-jwt"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const AuthChecker = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isLoggedIn() && localStorage.getItem("user")) {
      dispatch(setLoggedIn(JSON.parse(localStorage.getItem("user") as string)))
    }
  }, [])

  return <></>
}

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthChecker />
      <Component {...pageProps} />
      <ToastContainer />

      <div className={"mt-12"} />
    </Provider>
  )
}

export default App
