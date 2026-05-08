import { Link, usePage } from "@inertiajs/react"
import type { ReactNode } from "react"
import type { SharedProps } from "@/types"

export default function AppLayout({ children }: { children: ReactNode }) {
  const { user, flash } = usePage<SharedProps>().props

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-lg font-semibold">
            Reading Notes
          </Link>
          <nav className="flex items-center gap-3 text-sm">
            {user ? (
              <>
                <span className="text-gray-600">{user.email_address}</span>
                <Link href="/notes/new" className="rounded bg-gray-900 px-3 py-1 text-white">
                  新規メモ
                </Link>
                <Link
                  href="/session"
                  method="delete"
                  as="button"
                  className="text-gray-500 hover:text-gray-900"
                >
                  ログアウト
                </Link>
              </>
            ) : (
              <>
                <Link href="/session/new" className="text-gray-700">ログイン</Link>
                <Link href="/registration/new" className="rounded bg-gray-900 px-3 py-1 text-white">
                  新規登録
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {(flash.notice || flash.alert) && (
        <div className="mx-auto max-w-3xl px-4 pt-4">
          {flash.notice && (
            <div className="rounded border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
              {flash.notice}
            </div>
          )}
          {flash.alert && (
            <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              {flash.alert}
            </div>
          )}
        </div>
      )}

      <main className="mx-auto max-w-3xl px-4 py-6">{children}</main>
    </div>
  )
}
