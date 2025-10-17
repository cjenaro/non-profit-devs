class User < ApplicationRecord
  has_secure_password

  has_and_belongs_to_many :projects

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true,
            format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :skills, presence: true

  serialize :skills, type: Array, coder: JSON
end
