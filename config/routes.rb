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
    resources :boards, only: [:index, :create, :update, :destroy], param: :pid do
      resources :items, only: :index, module: :boards
    end
    resource :account, only: :update

    resources :items, only: [:index, :create, :update, :destroy] do
      member do
        post :upvote
        post :downvote
      end
      resources :status_changes, only: :index, module: :items
    end
  end

  namespace :db do
    resources :boards, only: [:index, :show], param: :pid
    get "boards/:pid/:section", to: "boards#show", as: :board_section,
      constraints: { section: /settings|kanban|items|participants|analytics/ }
    get "boards/:pid/items/:id(/:tab)", to: "items#show", as: :board_item,
      constraints: { tab: /history/ }
    resource :settings, only: :show
  end
end
