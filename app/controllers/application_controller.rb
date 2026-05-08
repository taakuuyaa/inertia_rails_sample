class ApplicationController < ActionController::Base
  include Authentication

  allow_browser versions: :modern

  inertia_share user: -> {
    Current.user&.as_json(only: [ :id, :email_address ])
  }
  inertia_share flash: -> {
    { notice: flash[:notice], alert: flash[:alert] }.compact
  }
end
