json.array!(@taggs) do |tagg|
  json.extract! tagg, :id, :name, :idarticle, :int
  json.url tagg_url(tagg, format: :json)
end
