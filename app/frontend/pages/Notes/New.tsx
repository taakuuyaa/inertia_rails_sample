import { Head } from "@inertiajs/react"
import AppLayout from "@/layouts/AppLayout"
import NoteForm from "@/components/NoteForm"
import type { Note, Tag } from "@/types"

type Props = {
  note: Partial<Note>
  availableTags: Tag[]
}

export default function NotesNew({ note, availableTags }: Props) {
  return (
    <AppLayout>
      <Head title="新規メモ" />
      <h1 className="mb-4 text-xl font-semibold">新規メモ</h1>
      <NoteForm note={note} availableTags={availableTags} action="create" />
    </AppLayout>
  )
}
