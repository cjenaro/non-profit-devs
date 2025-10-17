class Project < ApplicationRecord
  has_and_belongs_to_many :users

  validates :name, presence: true
  validates :description, presence: true
  validates :contact_email, presence: true,
            format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :slug, presence: true, uniqueness: true
  validates :status, presence: true

  before_validation :generate_slug, on: :create

  private

  def generate_slug
    self.slug ||= name.parameterize if name.present?
  end
end
