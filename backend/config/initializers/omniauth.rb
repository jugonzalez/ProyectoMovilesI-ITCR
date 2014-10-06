OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, '603630873087635' ,'61f2ff62240c8b9442bd8a5d317ddaa8'
  provider :twitter, 'fmblDDzVwbjdwPUJwjEGzszjJ' , 'BXFYcKwnm0KqBXEDhvUuJxbjzj4FCfuByGZJ479b4gkL8SJ7HX'

             
end
