import { Head, Link, router } from "@inertiajs/react"
import AppLayout from "@/layouts/AppLayout"
import type { Note } from "@/types"

type Props = {
  note: Note
}

export default function NotesShow({ note }: Props) {
  function destroy() {
    if (confirm("このメモを削除しますか？")) {
      router.delete(`/notes/${note.id}`)
    }
  }

  return (
    <AppLayout>
      <Head title={note.title} />

      <article className="rounded border bg-white p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h1 className="text-2xl font-semibold">{note.title}</h1>
          {note.rating && (
            <span className="text-yellow-500">{"★".repeat(note.rating)}</span>
          )}
        </div>
        {note.author && <p className="mt-1 text-gray-600">{note.author}</p>}

        {note.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {note.tags.map((t) => (
              <span key={t.id} className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                #{t.name}
              </span>
            ))}
          </div>
        )}

        {note.memo && (
          <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
            {note.memo}
          </div>
        )}

        <div className="mt-6 flex gap-3 text-sm">
          <Link href={`/notes/${note.id}/edit`} className="rounded border px-3 py-1">
            編集
          </Link>
          <button onClick={destroy} className="rounded border border-red-300 px-3 py-1 text-red-600">
            削除
          </button>
          <Link href="/notes" className="ml-auto text-gray-500 hover:text-gray-900">
            一覧へ戻る
          </Link>
        </div>
      </article>
    </AppLayout>
  )
}
