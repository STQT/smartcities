import { useAppDispatch } from "store"
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import { SOCIALS } from "services/api"
import { setAuthTokens } from "axios-jwt"
import { setLoggedIn } from "store/slices/main"
import { useRouter } from "next/router"
import { useLinkedIn } from "react-linkedin-login-oauth2"
import FacebookLogin from "react-facebook-login"
import cn from "classnames"
import { useLanguageQuery } from "next-export-i18n"

interface SignInWithProps {
  isRegister?: boolean
}

export const SignInWith = ({ isRegister }: SignInWithProps) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [languageQuery] = useLanguageQuery()

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
        router.push({ pathname: "/me", query: languageQuery })
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
          router.push({ pathname: "/me", query: languageQuery })
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
        router.push({ pathname: "/me", query: languageQuery })
      })
  }

  return (
    <section
      className={cn("w-full gap-3", {
        "flex flex-col": !isRegister,
        "grid grid-cols-3": isRegister
      })}>
      <GoogleLogin onSuccess={handleGoogleLogin} />

      <button
        onClick={linkedInLogin}
        className={
          "w-full h-[40px] bg-blue text-white font-semibold rounded-[5px] text-[14px]"
        }>
        LinkedIn
      </button>

      <FacebookLogin
        size={"small"}
        appId="1870845873123224"
        buttonStyle={{
          width: "100%",
          height: "40px",
          borderRadius: "5px",
          fontSize: "14px",
          outline: "none",
          border: "none"
        }}
        fields={"name"}
        // @ts-ignore
        callback={(res) => handleFacebookLogin(res!.accessToken as string)}
      />
    </section>
  )
}
