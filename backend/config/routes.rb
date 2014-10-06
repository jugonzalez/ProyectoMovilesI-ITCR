Rails.application.routes.draw do

  resources :taggs

  get 'authentications/index'

  get 'welcome/index'
  resources :articles

  namespace :api do
      resources :articles, format: :json
      resources :users, format: :json
      resources :taggings, format: :json   
   end

   match '/getMyAdds', :to => 'api/articles#getMyAdds', via: [:get, :post]     
   match '/createMyAdds', :to => 'api/articles#createMyAdds', via: [:get, :post]      
   match '/getPicture', :to => 'api/smart_users#show', via: [:get, :post] 
   match '/searchArticle', :to => 'api/articles#searchArticle', via: [:get, :post]   
   match '/searchTags', :to => 'api/articles#searchTags', via: [:get, :post]   
   match '/saveimage', :to => 'api/articles#saveimage', via: [:get, :post] 
   match '/score', :to => 'api/articles#score', via: [:get, :post]  
   match '/specialSearch', :to => 'api/articles#specialSearch', via: [:get, :post]  
   match '/searchtag', :to => 'api/tags#searchtag', via: [:get, :post] 
   match '/searchtagging', :to => 'api/taggings#searchtagging', via: [:get, :post]  
  match '/searchtagsarticle', :to => 'api/articles#searchtagsarticle', via: [:get, :post]   

  match '/getarticlesrange', :to => 'api/articles#getarticlesrange', via: [:get, :post]   



get 'tags/:tag', to: 'articles#index', as: :tag

# The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".
   
  # You can have the root of your site routed with "root"
   root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable
  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

get 'auth/:provider/callback', to: 'sessions#create', via: [:get, :post]
get 'auth/failure', to: redirect('/')
get 'signout', to: 'sessions#destroy', as: 'signout', via: [:get, :post]

end
