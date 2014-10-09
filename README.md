#API Reference

The following resources are made available by the *SmartShopping* API:

* [Articles](#articles)
* [smart_users](#smart_users)
* [tag_articles](#tag_articles)
* [tagarticles](#tagarticles)
* [taggs](#taggs)


The API follows a MVC design to control the access and manipulation of these resources. 

This file is auto-generated from the current state of the database. Instead of editing this file, please use the migrations feature of `Active Record` to incrementally modify your database, and then regenerate this schema definition.

##Articles
A articles represents a register article and the following properties:

| Property    | Data Type | Description                                                                             |
|:------------|-----------|:----------------------------------------------------------------------------------------|
| title       | t.string        |  Associates a article with specific name                                          | 
| costo       | t.integer       |  Indicates a price of a product or article                                        |
| email       | t.string        |  Indicates a email of the article publisher                                       |
| direccion   | t.string        |  Return the address of the person who published the article                       |
| created_at  | t.datetime      |  Date when the article was created                                                |
| updated_at  | t.datetime      |  Date when the article was created                                                |
| pic_file_name  | t.string     |  Indicates a title of a picture for articles  (file info)                         |
| pic_content_type  | t.string  |  Indicates a type of a file associated for article (file info)                    |
| pic_file_size     | t.integer |  Indicates a size of a file associated for article (file info)                  |
| pic_updated_at    | t.datetime|  Date when the picture has updated (file info)                                     |
| userid      | t.integer       |  ID of the publisher for quickly match with with the articles                     |
| username    | t.string        |  Name of the article owner                                                              |
| fotoname    | t.string        |  Name of a picture to a article                                                         |
| score       | t.integer       |  Actually points for each article                                                       |
| total_scores| t.integer       |  Acummulates points by publication                                                      |
| text        | t.text          |  Description on text field by article                                                   |

     
 
       
###Api::ArticlesController

| Method | Description                                           |
|:-------|:------------------------------------------------------|
| index             |  Obtains user data for a list of user id's |
| show              |  Gets all the articles and displays the results associated respectively each article      |
| saveimage         |  Save a image in database                                                |            
| searchArticle     |  Obtains a specific article on decreased order| 
| searchTags        |  Gets all tags associated with a unique tag-article                                      |     
| specialSearch     |  Obtains the matches associated to a global search for articles   |


###Api::ArticlesModels


| Method | Description                                           |
|:-------|:------------------------------------------------------|
| belongs_to             |  Obtains user data for a list of user id's |
| acts_as_taggable       | Creates a relation between articles and tags (best way to relation many to many)      |
| self.search            |  Searches articles with equal title  article    |
| self.byauthor          |  Searches articles with equal name of author    |


**Creating simple Article model**

```
$ bin/rails generate model Article title:string text:texte
```

**¿How show list of articles on index file?**
```
<% @articles.each do |article| %>
    <tr><div class="row">    
        <br>
            <div class="col-md-2 col-sm-3 text-center">
		<%= image_tag article.pic.url %>
            </div>
            <div class="col-md-10 col-sm-9">
              <h3>Nombre del producto: <%= article.title %> </h3>
	     <%= article.text %>
              <div class="row">
                <div class="col-xs-9">
                  <h4><span class="label label-default"><%= @nickname%></span></h4><h4>
                  <small style="font-family:courier,'new courier';" class="text-muted"><%= article.updated_at %>  • <a href="#" class="text-muted">Like </a></small>
                  </h4></div>
                <div class="col-xs-3"></div>
              </div>
<a href="/articles/<%= article.id %>/" class="btn btn-primary pull-right btnNext">Ver</a>
              <br><br>
            </div>
          </div>
          <hr>
    </tr>
  <% end %>
```

A Smart Users represents a register user like publisher:

#Smart users

**Example generating model of users**
```
$ rails generate model User name:string email:string
      invoke  active_record
      create    db/migrate/[timestamp]_create_users.rb
      create    app/models/user.rb
      invoke    rspec
      create      spec/models/user_spec.rb
```

| Property    | Data Type | Description                                                                             |
|:------------|-----------|:----------------------------------------------------------------------------------------|
| name       | t.string        |  Associates a article with specific name                                          | 
| avatar_file_name       | t.string       |  Indicates a avatar name                                        |
| avatar_content_type       | t.string    |  Indicates a type of file for example photo of the owner             |
| avatar_file_size       | t.string       |  Indicates a size of file                                       |
| avatar_path       | t.integer       |  Root of user, similary to profile page                                        |
| avatar_updated_at      | t.datetime |  Date when the article was the avatar was updated                    |
| created_at       | t.datetime       |  Date when the article was created                                         |
| updated_at       | t.datetime       |  Date when the article was updated                                        |




Adding Tagging With Acts-as-Taggable-on

There are a lot of tagging libraries available but by far the most popular is acts-as-taggable-on. This gem is a little dated but it’s one of the few to have been maintained over the years. To use it in a Rails application we just need to add it to the gemfile then run bundle to install it.

**Example Tagging**

```
$ rails g acts_as_taggable_on:migration
$ rake db:migrate
```


##Create relation for tags and articles

##Tag articles

| Property    | Data Type | Description                                                                             |
|:------------|-----------|:----------------------------------------------------------------------------------------|
| name       | t.string        |  Associates a article with specific name                                          | 
| idArticle       | t.integer       |  Indicates a price of a product or article                                        |
| created_at       | t.datetime        |  Indicates a email of the article publisher                                       |
| updated_at       | t.datetime        |  Indicates a email of the article publisher                                       |

**Matching Tags**

```
def searchtagging
	tags = Tagging.all()
	render json: tags, status: 200
end
```

##tagarticles

| Property    | Data Type | Description                                                                             |
|:------------|-----------|:----------------------------------------------------------------------------------------|
| name       | t.string        |  Associates a article with specific name                                          | 
| idarticle       | t.integer       |  Indicates a price of a product or article                                         |
| created_at       | t.datetime        |  Date when the article was created                                      |
| updated_at       | t.datetime        |   Date when the article was updated                                        |


**Example how represents tags with id**


```
  add_index "taggings", ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true, using: :btree
  
  add_index "taggings", ["taggable_id", "taggable_type", "context"], name: "index_taggings_on_taggable_id_and_taggable_type_and_context", using: :btree
```

##Tags
| Property    | Data Type | Description                                                                             |
|:------------|-----------|:----------------------------------------------------------------------------------------|
| tags      | t.string    |  Contains the text for the tag                                                          | 
| name      | t.integer   |  Especific ID for each unique tag                                                       |

##taggs
| Property    | Data Type | Description                                                                             |
|:------------|-----------|:----------------------------------------------------------------------------------------|
| created_at       | t.datetime       | Indicates date when the tag was associated                                  | 
| updated_at       | t.datetime       | Indicates date when the tag was updated(association)                        |
| name       | t.string             |  Contains a string with the tag name                                      |
| idarticle       | t.string        |  Contains a integer with the tag id                                       |
| int       | t.string             |  Indentity for asociation                                                      |


##Show tagging result
**¿How show association from tags ?**

```
class TaggsController < ApplicationController
  before_action :set_tagg, only: [:show, :edit, :update, :destroy]
```

**Get tags object association and display this**

```
get 'tags/:tag', to: 'articles#index', as: :tag

```

**¿How to add tags?**

```
add_index "tags", ["name"], name: "index_tags_on_name", unique: true, using: :btree
```
#Settings

In general, the work of configuring Rails means configuring the components of Rails, as well as configuring Rails itself. The configuration file config/application.rb and environment-specific configuration files (such as config/environments/production.rb) allow you to specify the various settings that you want to pass down to all of the components.


#Configure database
```
development:
  adapter: postgresql
  encoding: unicode
  database: smartshopping_development
  pool: 5
  username: juan
  password: ********

test:
  adapter: postgresql
  encoding: unicode
  database: smartshopping_test
  pool: 5
  username: juan
  password: ********
```
___

#Plugins

##com.oauthio.plugins.oauthio
This is the Cordova/Phonegap SDK for OAuth.io. OAuth.io allows you to integrate 100+ providers really easily in your web app, without worrying about each provider's OAuth specific implementation.




###Installation
```
This plugin is supported on PhoneGap (Cordova) v3.0.0 and above.

$ cordova plugin add https://github.com/oauth-io/oauth-phonegap
```

###Configure with rails
```
OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, '603630873087635' ,'61f2ff62240c8b9442bd8a5d317ddaa8'
  provider :twitter, 'fmblDDzVwbjdwPUJwjEGzszjJ' , 'BXFYcKwnm0KqBXEDhvUuJxbjzj4FCfuByGZJ479b4gkL8SJ7HX'
end
```


##com.phonegap.plugins.facebookconnect	

The Facebook plugin for Apache Cordova allows you to use the same JavaScript code in your Cordova application as you use in your web application. However, unlike in the browser, the Cordova application will use the native Facebook app to perform Single Sign On for the user. If this is not possible then the sign on will degrade gracefully using the standard dialog based authentication.

This plugin requires Cordova CLI.
###Installation
```
To install the plugin in your app, execute the following (replace variables where necessary)...
cordova create myApp
cd myApp/
cordova platform add android
cordova -d plugin add /Users/your/path/here/phonegap-facebook-plugin --variable APP_ID="123456789" --variable APP_NAME="myApplication"
```
##org.apache.cordova.camera

This plugin provides an API for taking pictures and for choosing images from the system's image library.

This plugin provides an API for taking pictures and for choosing images from the system's image library.
###Installation
```
cordova plugin add org.apache.cordova.camera
```

##org.apache.cordova.geolocation
This plugin provides information about the device's location, such as latitude and longitude. Common sources of location information include Global Positioning System (GPS) and location inferred from network signals such as IP address, RFID, WiFi and Bluetooth MAC addresses, and GSM/CDMA cell IDs. There is no guarantee that the API returns the device's actual location.

###Installation
```
cordova plugin add org.apache.cordova.geolocatio
```

###Quick Example
```
var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);
```


##org.apache.cordova.inappbrowser
This plugin provides a web browser view that displays when calling window.open().
###Installation
```
cordova plugin add org.apache.cordova.inappbrowser
```
###Quick Example
```
var ref = window.open('http://apache.org', '_blank', 'location=yes');
ref.addEventListener('loadstop', function() {
    ref.insertCSS({file: "mystyles.css"});
});
```
##android.json
Way to get JSON info from the server




#Concepts 
##What is Rails?
Rails is a web application development framework written in the Ruby language. It is designed to make programming web applications easier by making assumptions about what every developer needs to get started. It allows you to write less code while accomplishing more than many other languages and frameworks. Experienced Rails developers also report that it makes web application development more fun.

##Active Record
**Active Record** is the M in MVC - the model - which is the layer of the system responsible for representing business data and logic. Active Record facilitates the creation and use of business objects whose data requires persistent storage to a database. It is an implementation of the Active Record pattern which itself is a description of an Object Relational Mapping system.

##GEMFILE
Bundler provides a consistent environment for Ruby projects by tracking and installing the exact gems and versions that are needed. 

Bundler is an exit from dependency hell, and ensures that the gems you need are present in development, staging, and production. Starting work on a project is as simple as `bundle install`. The way how we config the file is the next:

```
source 'https://rubygems.org'
gem 'rails', '4.1.5'
gem 'pg'
gem 'sass-rails', '~> 4.0.3'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.0.0'
group :production do
   gem 'rails_12factor'
 end
gem 'paperclip', :git => "git://github.com/thoughtbot/paperclip.git"
gem 'jquery-rails'
gem 'turbolinks'
gem 'jbuilder', '~> 2.0'
gem 'sdoc', '~> 0.4.0',          group: :doc
gem 'spring',        group: :development
gem "tabs_on_rails"
gem 'devise'
gem 'oauth2'
gem 'bootstrap-sass', '~> 3.1.1'
gem 'acts-as-taggable-on'
gem 'omniauth-facebook'
gem 'omniauth-twitter'
```


#License

The MIT License

Copyright (c) 2010-2014 Instituto Tecnológico de Costa Rica, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
