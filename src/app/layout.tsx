import type { Metadata } from 'next'
import { Zen_Kaku_Gothic_New } from 'next/font/google'
import { CustomQueryProvider } from './_components/CustomQueryProvider'
import './globals.css'
import './theme.css'

const zenKakuGothicNew = Zen_Kaku_Gothic_New({ weight: ['400'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: '体温管理アプリ',
  description: '日々の体温を記録するアプリです。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={zenKakuGothicNew.className}>
        <CustomQueryProvider>{children}</CustomQueryProvider>
      </body>
    </html>
  )
}
