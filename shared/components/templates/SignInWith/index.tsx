import { useAppDispatch } from "store"
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import { SOCIALS } from "services/api"
import { setAuthTokens } from "axios-jwt"
import { setLoggedIn } from "store/slices/main"
import { useRouter } from "next/router"
import { useLinkedIn } from "react-linkedin-login-oauth2"
import { Button } from "../../atoms"
import FacebookLogin from "react-facebook-login"

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
        router.push("/me")
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
          router.push("/me")
        })
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const handleFacebookLogin = (token: string) => {
    SOCIALS.FACEBOOK.login(token)
      .then((res) => {
        setAuthTokens({
          accessToken: res.data.access,
          refreshToken: res.data.refresh
        })
      })
      .then(() => {
        dispatch(setLoggedIn())
        router.push("/me")
      })
  }

  return (
    <section className={"w-full flex flex-col"}>
      <GoogleLogin onSuccess={handleGoogleLogin} />

      <Button onClick={linkedInLogin}>LinkedIn</Button>

      <FacebookLogin
        appId="1870845873123224"
        autoLoad={true}
        fields={"name"}
        // @ts-ignore
        callback={(res) => handleFacebookLogin(res!.accessToken as string)}
      />
    </section>
  )
}
