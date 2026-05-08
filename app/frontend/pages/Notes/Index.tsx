import { Head, Link, router, useForm } from "@inertiajs/react"
import AppLayout from "@/layouts/AppLayout"
import type { Note, Tag } from "@/types"

type Props = {
  notes: Note[]
  tags: Tag[]
  filter: { tagId: number | null }
}

export default function NotesIndex({ notes, tags, filter }: Props) {
  const tagForm = useForm({ name: "" })

  function applyTag(tagId: number | null) {
    router.get("/notes", tagId ? { tag_id: tagId } : {}, {
      preserveState: true,
      preserveScroll: true,
      only: ["notes", "filter"],
    })
  }

  function addTag(e: React.FormEvent) {
    e.preventDefault()
    tagForm.post("/tags", {
      onSuccess: () => tagForm.reset("name"),
    })
  }

  return (
    <AppLayout>
      <Head title="メモ一覧" />

      <section className="mb-6 rounded border bg-white p-4">
        <h2 className="mb-2 text-sm font-semibold text-gray-700">タグ</h2>
        <div className="mb-3 flex flex-wrap gap-2">
          <button
            onClick={() => applyTag(null)}
            className={`rounded-full border px-3 py-1 text-sm ${
              filter.tagId == null ? "bg-gray-900 text-white" : "bg-white"
            }`}
          >
            すべて
          </button>
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => applyTag(tag.id)}
              className={`rounded-full border px-3 py-1 text-sm ${
                filter.tagId === tag.id ? "bg-gray-900 text-white" : "bg-white"
              }`}
            >
              #{tag.name}
            </button>
          ))}
        </div>
        <form onSubmit={addTag} className="flex gap-2">
          <input
            type="text"
            value={tagForm.data.name}
            onChange={(e) => tagForm.setData("name", e.target.value)}
            placeholder="新しいタグ"
            className="flex-1 rounded border px-3 py-1 text-sm"
          />
          <button
            type="submit"
            disabled={tagForm.processing || !tagForm.data.name}
            className="rounded border px-3 py-1 text-sm disabled:opacity-50"
          >
            追加
          </button>
        </form>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-gray-700">メモ</h2>
        {notes.length === 0 ? (
          <p className="rounded border border-dashed bg-white p-6 text-center text-sm text-gray-500">
            メモはまだありません。<Link href="/notes/new" className="underline">最初の1件を追加</Link>
          </p>
        ) : (
          <ul className="space-y-3">
            {notes.map((note) => (
              <li key={note.id} className="rounded border bg-white p-4">
                <Link href={`/notes/${note.id}`} className="block">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-medium">{note.title}</h3>
                    {note.rating && (
                      <span className="text-sm text-yellow-600">{"★".repeat(note.rating)}</span>
                    )}
                  </div>
                  {note.author && (
                    <p className="mt-1 text-sm text-gray-600">{note.author}</p>
                  )}
                  {note.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {note.tags.map((t) => (
                        <span key={t.id} className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                          #{t.name}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </AppLayout>
  )
}
