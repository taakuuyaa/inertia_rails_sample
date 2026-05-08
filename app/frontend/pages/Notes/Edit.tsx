import { Head } from "@inertiajs/react"
import AppLayout from "@/layouts/AppLayout"
import NoteForm from "@/components/NoteForm"
import type { Note, Tag } from "@/types"

type Props = {
  note: Note
  availableTags: Tag[]
}

export default function NotesEdit({ note, availableTags }: Props) {
  return (
    <AppLayout>
      <Head title={`編集: ${note.title}`} />
      <h1 className="mb-4 text-xl font-semibold">メモを編集</h1>
      <NoteForm note={note} availableTags={availableTags} action="update" />
    </AppLayout>
  )
}
