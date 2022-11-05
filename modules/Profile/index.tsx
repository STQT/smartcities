import { Page } from "shared/components/templates"
import { ProfileSection, PublicationsSection } from "./Sections"

interface ProfilePageProps {
  username: string
}

export const ProfilePage = ({ username }: ProfilePageProps) => {
  return (
    <Page title={username}>
      <main className={"flex-1 flex flex-col overflow-hidden rounded-t-[20px]"}>
        <section className={"rounded-t-[20px] overflow-hidden"}>
          <ProfileSection username={username} />
        </section>

        <section>
          <PublicationsSection username={username} />
        </section>
      </main>
    </Page>
  )
}
