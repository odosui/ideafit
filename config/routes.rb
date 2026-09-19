Rails.application.routes.draw do
  devise_for :users, skip: :all

  get "sign_in", to: "magic_links#new", as: :new_user_session
  post "sign_in", to: "magic_links#create", as: :magic_links
  get "sign_in/:token", to: "magic_links#show", as: :magic_link
  get "sign_out", to: "sessions#destroy", as: :destroy_user_session

  get "up" => "rails/health#show", as: :rails_health_check

  root "db/boards#index"
  get "home", to: "participant_home#show", as: :participant_home

  get "b/:pid(/:kind)", to: "boards#show", constraints: { kind: /ideas|bugs|questions/ }

  namespace :api do
    resources :boards, only: [:index, :create, :update, :destroy], param: :pid
    resource :account, only: :update

    resources :items, only: [:index, :create, :update, :destroy] do
      member do
        post :upvote
        post :downvote
      end
    end
  end

  namespace :db do
    resources :boards, only: [:index, :show], param: :pid
    resource :settings, only: :show
  end
end
