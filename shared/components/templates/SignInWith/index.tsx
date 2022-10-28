import { useAppDispatch } from "store"
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import { SOCIALS } from "services/api"
import { setAuthTokens } from "axios-jwt"
import { setLoggedIn } from "store/slices/main"
import { useRouter } from "next/router"
import { useLinkedIn } from "react-linkedin-login-oauth2"
import { Button } from "../../atoms"
import { LinkedIn } from "react-linkedin-login-oauth2"

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

  const { linkedInLogin } = useLinkedIn({
    clientId: "7854iw2a91d5ru",
    scope: "r_liteprofile,r_emailaddress",
    redirectUri: `${
      typeof window === "object" && window.location.origin
    }/linkedin`,
    onSuccess: (code) => {
      SOCIALS.LINKEDIN.login(code)
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
    },
    onError: (error) => {
      console.log(error)
    }
  })

  return (
    <section className={"w-full flex flex-col"}>
      <GoogleLogin onSuccess={handleGoogleLogin} />

      <Button onClick={linkedInLogin}>LinkedIn</Button>
    </section>
  )
}
