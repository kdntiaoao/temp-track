import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import './theme.css'
import { CustomProvider } from './_components/provider/CustomProvider'

const notoSansJP = Noto_Sans_JP({ weight: ['400'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: '体温管理アプリ',
  description: '日々の体温を記録するアプリです。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
        <CustomProvider>{children}</CustomProvider>
      </body>
    </html>
  )
}
