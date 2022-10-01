import { ReactNode } from "react"
import Head from "next/head"

import { Header, Menu, Aside } from "shared/components/templates"

interface PageProps {
  title: string
  children: ReactNode
  withMenu?: boolean
  withAside?: boolean

  meta?: {
    description?: "string"
  }
}

export const Page = ({
  title,
  meta,
  children,
  withMenu = true,
  withAside = false
}: PageProps) => {
  return (
    <main className={"container mx-auto px-3 md:px-5"}>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

        {meta?.description && (
          <meta name="description" content={meta.description} />
        )}
      </Head>

      <Header />

      <section className={"flex gap-[20px]"}>
        {withMenu && <Menu />}
        {children}
        {withAside && <Aside />}
      </section>
    </main>
  )
}
