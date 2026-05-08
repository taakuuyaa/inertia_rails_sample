import { Head, useForm } from "@inertiajs/react"
import AppLayout from "@/layouts/AppLayout"

export default function RegistrationsNew() {
  const form = useForm({
    email_address: "",
    password: "",
    password_confirmation: "",
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    form.post("/registration")
  }

  return (
    <AppLayout>
      <Head title="新規登録" />
      <h1 className="mb-4 text-xl font-semibold">新規登録</h1>
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
          {form.errors.email_address && (
            <p className="mt-1 text-sm text-red-600">{form.errors.email_address}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm">パスワード</label>
          <input
            type="password"
            value={form.data.password}
            onChange={(e) => form.setData("password", e.target.value)}
            className="w-full rounded border px-3 py-2"
            autoComplete="new-password"
            required
          />
          {form.errors.password && (
            <p className="mt-1 text-sm text-red-600">{form.errors.password}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm">パスワード（確認）</label>
          <input
            type="password"
            value={form.data.password_confirmation}
            onChange={(e) => form.setData("password_confirmation", e.target.value)}
            className="w-full rounded border px-3 py-2"
            autoComplete="new-password"
            required
          />
        </div>
        <button
          type="submit"
          disabled={form.processing}
          className="rounded bg-gray-900 px-4 py-2 text-white disabled:opacity-50"
        >
          登録する
        </button>
      </form>
    </AppLayout>
  )
}
