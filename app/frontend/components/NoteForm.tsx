import { useForm } from "@inertiajs/react"
import type { Note, Tag } from "@/types"

type Props = {
  note: Partial<Note> & { id?: number; tags?: Tag[] }
  availableTags: Tag[]
  action: "create" | "update"
}

export default function NoteForm({ note, availableTags, action }: Props) {
  const form = useForm({
    title: note.title ?? "",
    author: note.author ?? "",
    memo: note.memo ?? "",
    rating: note.rating ?? null as number | null,
    tag_ids: note.tags?.map((t) => t.id) ?? [],
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    form.transform((data) => ({ note: data }))
    if (action === "create") {
      form.post("/notes")
    } else if (note.id) {
      form.patch(`/notes/${note.id}`)
    }
  }

  function toggleTag(id: number) {
    const next = form.data.tag_ids.includes(id)
      ? form.data.tag_ids.filter((t) => t !== id)
      : [...form.data.tag_ids, id]
    form.setData("tag_ids", next)
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded border bg-white p-4">
      <div>
        <label className="mb-1 block text-sm">タイトル</label>
        <input
          type="text"
          value={form.data.title}
          onChange={(e) => form.setData("title", e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        />
        {form.errors.title && (
          <p className="mt-1 text-sm text-red-600">{form.errors.title}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm">著者</label>
        <input
          type="text"
          value={form.data.author}
          onChange={(e) => form.setData("author", e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm">感想</label>
        <textarea
          value={form.data.memo}
          onChange={(e) => form.setData("memo", e.target.value)}
          rows={6}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm">評価</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => form.setData("rating", form.data.rating === n ? null : n)}
              className={`text-xl ${
                (form.data.rating ?? 0) >= n ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {availableTags.length > 0 && (
        <div>
          <label className="mb-1 block text-sm">タグ</label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => {
              const checked = form.data.tag_ids.includes(tag.id)
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleTag(tag.id)}
                  className={`rounded-full border px-3 py-1 text-sm ${
                    checked ? "bg-gray-900 text-white" : "bg-white"
                  }`}
                >
                  #{tag.name}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={form.processing}
        className="rounded bg-gray-900 px-4 py-2 text-white disabled:opacity-50"
      >
        {action === "create" ? "追加" : "保存"}
      </button>
    </form>
  )
}
