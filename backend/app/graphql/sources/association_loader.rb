module Sources
  # Generic loader for has_many associations (including through: relationships)
  # Use this for most associations to avoid N+1 queries
  #
  # When to use a custom loader instead:
  # - Complex filtering or sorting requirements
  # - Non-standard association patterns
  # - Performance optimizations for very large datasets
  # - Associations that need custom SQL queries
  class AssociationLoader < GraphQL::Dataloader::Source
    def initialize(model_class, association_name)
      @model_class = model_class
      @association_name = association_name
    end

    def fetch(record_ids)
      # Load all associated records in one query
      records = @model_class.includes(@association_name).where(id: record_ids)

      # Group the associated records by the parent record ID
      grouped = Hash.new { |h, k| h[k] = [] }

      records.each do |record|
        associated = record.send(@association_name)
        # Convert to array if it's a collection
        associated_array = associated.respond_to?(:to_a) ? associated.to_a : [ associated ].compact
        grouped[record.id].concat(associated_array)
      end

      # Return arrays in the same order as record_ids
      record_ids.map { |id| grouped[id] }
    end
  end
end
