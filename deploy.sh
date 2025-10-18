#!/bin/bash

# Non-Profit Devs Deployment Script
# This script helps with Kamal deployment setup and execution

set -e

echo "🚀 Non-Profit Devs Deployment Script"
echo "===================================="

# Check if Kamal is installed
if ! command -v kamal &>/dev/null; then
  echo "❌ Kamal is not installed. Installing..."
  gem install kamal
fi

# Check if 1Password CLI is authenticated
if ! op account list &>/dev/null; then
  echo "❌ 1Password CLI is not authenticated"
  echo "Please run: op signin"
  exit 1
fi

echo "✅ Prerequisites checked"

# Ask for confirmation
read -p "🚀 Ready to deploy? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Deployment cancelled"
  exit 0
fi

# Deploy
echo "🚀 Deploying application..."
kamal deploy

# Post-deployment tasks
echo "📋 Running post-deployment tasks..."
echo "  - Running database migrations..."
kamal app exec "bundle exec rails db:migrate"

echo "✅ Deployment completed successfully!"
echo ""
echo "Useful commands:"
echo "  kamal app logs          # View application logs"
echo "  kamal app exec 'rails console'  # Access Rails console"
echo "  kamal app restart       # Restart application"
echo "  kamal rollback          # Rollback to previous version"

