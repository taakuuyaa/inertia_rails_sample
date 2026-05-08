class NotesController < ApplicationController
  before_action :set_note, only: [ :show, :edit, :update, :destroy ]

  def index
    notes = Current.user.notes.recent
    notes = notes.tagged_with(params[:tag_id]) if params[:tag_id].present?

    render inertia: "Notes/Index", props: {
      notes: -> { notes.includes(:tags).map { |n| serialize_note(n) } },
      tags: -> { Current.user.tags.ordered.map { |t| { id: t.id, name: t.name } } },
      filter: { tagId: params[:tag_id]&.to_i }
    }
  end

  def show
    render inertia: "Notes/Show", props: {
      note: serialize_note(@note)
    }
  end

  def new
    note = Current.user.notes.new
    render inertia: "Notes/New", props: {
      note: serialize_note(note),
      availableTags: -> { Current.user.tags.ordered.map { |t| { id: t.id, name: t.name } } }
    }
  end

  def create
    note = Current.user.notes.new(note_params.except(:tag_ids))
    note.tag_ids = filtered_tag_ids(note_params[:tag_ids])
    if note.save
      redirect_to note, notice: "メモを追加しました"
    else
      redirect_to new_note_path, inertia: { errors: note.errors }
    end
  end

  def edit
    render inertia: "Notes/Edit", props: {
      note: serialize_note(@note),
      availableTags: -> { Current.user.tags.ordered.map { |t| { id: t.id, name: t.name } } }
    }
  end

  def update
    @note.assign_attributes(note_params.except(:tag_ids))
    @note.tag_ids = filtered_tag_ids(note_params[:tag_ids])
    if @note.save
      redirect_to @note, notice: "メモを更新しました"
    else
      redirect_to edit_note_path(@note), inertia: { errors: @note.errors }
    end
  end

  def destroy
    @note.destroy
    redirect_to notes_path, notice: "メモを削除しました"
  end

  private
    def set_note
      @note = Current.user.notes.includes(:tags).find(params[:id])
    end

    def note_params
      params.require(:note).permit(:title, :author, :memo, :rating, tag_ids: [])
    end

    def filtered_tag_ids(ids)
      Array(ids).map(&:to_i).select { |id| Current.user.tags.exists?(id: id) }
    end

    def serialize_note(note)
      {
        id: note.id,
        title: note.title,
        author: note.author,
        memo: note.memo,
        rating: note.rating,
        createdAt: note.created_at&.iso8601,
        tags: note.tags.map { |t| { id: t.id, name: t.name } }
      }
    end
end
