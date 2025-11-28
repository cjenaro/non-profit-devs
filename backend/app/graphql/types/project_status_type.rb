# frozen_string_literal: true

module Types
  class ProjectStatusType < Types::BaseEnum
    description "Project status"

    # Use the Rails enum statuses
    Project.statuses.each do |key, value|
      description = case key.to_sym
      when :pending_review then "Project is pending review"
      when :planning then "Project is in planning phase"
      when :open then "Project is open for volunteers"
      when :active then "Project is actively being worked on"
      when :completed then "Project has been completed"
      when :cancelled then "Project has been cancelled"
      else key.to_s.humanize
      end

      value key.to_s, description
    end
  end
end
