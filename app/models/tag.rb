class Tag < ApplicationRecord
  belongs_to :user
  has_many :note_tags, dependent: :destroy
  has_many :notes, through: :note_tags

  validates :name, presence: true, length: { maximum: 30 },
                   uniqueness: { scope: :user_id, case_sensitive: false }

  scope :ordered, -> { order(:name) }
end
