require 'rack/contrib/try_static'

# Monkey patch Heroku's Rack Static middleware to override it's hard-coded max-age. See the original code here https://gist.github.com/480819
module Heroku
  class StaticAssetsMiddleware
    def initialize(app)
      @app = app
    end

    def call(env)
      @app.call(env)
    end
  end
end

use Rack::TryStatic, :root => "./", :cache_control => 'public, max-age=259200', :urls => %w[/], :try => ['.html', 'index.html', '/index.html']

# Run your own Rack app here or use this one to serve 404 messages:
run lambda{ |env| [ 404, { 'Content-Type'  => 'text/html' }, ['404 - page not found'] ] }
