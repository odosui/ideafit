source "https://rubygems.org"

gem "rails", "~> 8.1.3"
# The modern asset pipeline for Rails [https://github.com/rails/propshaft]
gem "propshaft"
gem "pg", "~> 1.1"
gem "puma", ">= 5.0"
gem "jbuilder"

# Use the database-backed adapters for Rails.cache, Active Job, and Action Cable
gem "solid_cache"
gem "solid_queue"
gem "solid_cable"

gem 'devise'

gem 'vite_rails'

# views

gem "bootsnap", require: false

# json 3 made JSON.parse options keyword-only; Rails 8.1 still passes a hash.
gem "json", "~> 2.19"

# Add HTTP asset caching/compression and X-Sendfile acceleration to Puma [https://github.com/basecamp/thruster/]
gem "thruster", require: false

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
gem "image_processing", "~> 1.2"

group :development, :test do
  gem "debug", platforms: %i[ mri windows ], require: "debug/prelude"
  gem "bundler-audit", require: false
  gem "brakeman", require: false
  gem "letter_opener"
end

group :development do
  gem "web-console"
end
