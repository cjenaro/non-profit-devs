# Clear existing data
puts "Clearing database..."
User.destroy_all
Project.destroy_all

# Create users
puts "Creating users..."
users = [
  {
    name: "Alice Developer",
    email: "alice@example.com",
    password: "password123",
    skills: [ "RUBY", "RAILS", "JAVASCRIPT", "REACT" ]
  },
  {
    name: "Bob Designer",
    email: "bob@example.com",
    password: "password123",
    skills: [ "HTML", "CSS", "JAVASCRIPT", "REACT" ]
  },
  {
    name: "Charlie DevOps",
    email: "charlie@example.com",
    password: "password123",
    skills: [ "DOCKER", "KUBERNETES", "AWS", "CI_CD" ]
  }
].map { |attrs| User.create!(attrs) }

# Create projects
puts "Creating projects..."
projects = [
  {
    name: "Food Bank Management System",
    description: "A system to help food banks track inventory and donations",
    contact_email: "contact@foodbank.org",
     status: "open"
  },
  {
    name: "Volunteer Coordination Platform",
    description: "Platform to coordinate volunteers for various nonprofits",
    contact_email: "volunteer@platform.org",
     status: "open"
  },
  {
    name: "Educational Resources Hub",
    description: "Free educational resources for underserved communities",
    contact_email: "education@hub.org",
     status: "planning"
  }
].map { |attrs| Project.create!(attrs) }

# Associate users with projects
puts "Creating associations..."
projects[0].users << [ users[0], users[1] ]
projects[1].users << [ users[1], users[2] ]
projects[2].users << users[0]

puts "Seeding complete!"
puts "Created #{User.count} users and #{Project.count} projects"
