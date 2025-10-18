# frozen_string_literal: true

module Types
  class SkillType < Types::BaseEnum
    description "Programming skills and technologies"

    value "JAVASCRIPT", "JavaScript programming"
    value "TYPESCRIPT", "TypeScript programming"
    value "RUBY", "Ruby programming"
    value "PYTHON", "Python programming"
    value "JAVA", "Java programming"
    value "CSHARP", "C# programming"
    value "PHP", "PHP programming"
    value "GO", "Go programming"
    value "RUST", "Rust programming"

    value "REACT", "React framework"
    value "ANGULAR", "Angular framework"
    value "VUE", "Vue.js framework"
    value "RAILS", "Ruby on Rails framework"
    value "DJANGO", "Django framework"
    value "FLASK", "Flask framework"
    value "SPRING", "Spring framework"
    value "DOTNET", ".NET framework"

    value "NODEJS", "Node.js runtime"
    value "GRAPHQL", "GraphQL"
    value "REST", "REST APIs"
    value "SQL", "SQL databases"
    value "NOSQL", "NoSQL databases"
    value "MONGODB", "MongoDB"
    value "POSTGRESQL", "PostgreSQL"
    value "MYSQL", "MySQL"
    value "REDIS", "Redis"

    value "AWS", "Amazon Web Services"
    value "AZURE", "Microsoft Azure"
    value "GCP", "Google Cloud Platform"
    value "DOCKER", "Docker"
    value "KUBERNETES", "Kubernetes"

    value "HTML", "HTML"
    value "CSS", "CSS"
    value "SASS", "Sass/SCSS"
    value "TAILWIND", "Tailwind CSS"

    value "GIT", "Git version control"
    value "CI_CD", "CI/CD"
    value "TESTING", "Software testing"
  end
end
