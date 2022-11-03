import { Page } from "shared/components/templates"
import { ProfileTab } from "./Tabs"

interface ProfilePageProps {
  username: string
}

export const ProfilePage = ({ username }: ProfilePageProps) => {
  return (
    <Page title={username}>
      <main className={"flex-1 flex flex-col overflow-hidden rounded-[20px]"}>
        <section className={"rounded-[20px] overflow-hidden"}>
          <ProfileTab username={username} />
        </section>
      </main>
    </Page>
  )
}
