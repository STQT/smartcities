import { useAppDispatch } from "store"
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import { SOCIALS } from "services/api"
import { setAuthTokens } from "axios-jwt"
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
        dispatch(setLoggedIn())
        router.push("/feed")
      })
  }

  return (
    <section className={"w-full flex flex-col"}>
      <GoogleLogin onSuccess={handleGoogleLogin} />
    </section>
  )
}
