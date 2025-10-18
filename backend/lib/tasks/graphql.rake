namespace :graphql do
  desc "Export GraphQL schema to schema.graphql and docs"
  task export_schema: :environment do
    schema_definition = BackendSchema.to_definition
    File.write("schema.graphql", schema_definition)
    puts "Schema exported to schema.graphql and docs/api/schema.graphql"
  end
end
