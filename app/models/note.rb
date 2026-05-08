class Note < ApplicationRecord
  belongs_to :user
  has_many :note_tags, dependent: :destroy
  has_many :tags, through: :note_tags

  validates :title, presence: true, length: { maximum: 200 }
  validates :author, length: { maximum: 200 }
  validates :memo, length: { maximum: 5_000 }
  validates :rating, numericality: { only_integer: true, in: 1..5 }, allow_nil: true

  scope :recent, -> { order(created_at: :desc) }
  scope :tagged_with, ->(tag_id) { joins(:note_tags).where(note_tags: { tag_id: tag_id }) }
end
