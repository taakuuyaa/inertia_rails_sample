import { Head, useForm } from "@inertiajs/react"
import AppLayout from "@/layouts/AppLayout"

export default function SessionsNew() {
  const form = useForm({
    email_address: "",
    password: "",
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    form.post("/session")
  }

  return (
    <AppLayout>
      <Head title="ログイン" />
      <h1 className="mb-4 text-xl font-semibold">ログイン</h1>
      <form onSubmit={submit} className="space-y-4 rounded border bg-white p-4">
        <div>
          <label className="mb-1 block text-sm">メールアドレス</label>
          <input
            type="email"
            value={form.data.email_address}
            onChange={(e) => form.setData("email_address", e.target.value)}
            className="w-full rounded border px-3 py-2"
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm">パスワード</label>
          <input
            type="password"
            value={form.data.password}
            onChange={(e) => form.setData("password", e.target.value)}
            className="w-full rounded border px-3 py-2"
            autoComplete="current-password"
            required
          />
        </div>
        <button
          type="submit"
          disabled={form.processing}
          className="rounded bg-gray-900 px-4 py-2 text-white disabled:opacity-50"
        >
          ログイン
        </button>
      </form>
    </AppLayout>
  )
}
