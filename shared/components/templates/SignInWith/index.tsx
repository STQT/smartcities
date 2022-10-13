import { useAppDispatch } from "store"
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import { SOCIALS, USER } from "services/api"
import { setAuthTokens } from "axios-jwt"
import { AxiosResponse } from "axios"
import { User } from "../../../types"
import { setLoggedIn } from "store/slices/main"
import { useRouter } from "next/router"

export const SignInWith = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleGoogleLogin = (res: CredentialResponse) => {
    SOCIALS.GOOGLE.login(res.credential as string)
      .then((res) => {
        setAuthTokens({
          accessToken: res.data.access,
          refreshToken: res.data.refresh
        })
      })
      .then(() => {
        USER.getCurrent().then((res: AxiosResponse<User>) => {
          dispatch(setLoggedIn(res.data))
          router.push("/feed")
        })
      })
  }

  return (
    <section className={"w-full flex flex-col"}>
      <GoogleLogin onSuccess={handleGoogleLogin} />
    </section>
  )
}
