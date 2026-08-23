import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '基本情報技術者 合格ナビ',
  description: '教材・独自問題・弱点補強・本番形式模試で基本情報技術者試験の合格を目指す学習サイト。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
