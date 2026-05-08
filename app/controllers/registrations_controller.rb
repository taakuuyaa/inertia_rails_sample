class RegistrationsController < ApplicationController
  allow_unauthenticated_access only: %i[ new create ]

  def new
    render inertia: "Registrations/New"
  end

  def create
    user = User.new(registration_params)
    if user.save
      start_new_session_for user
      redirect_to after_authentication_url, notice: "Welcome!"
    else
      redirect_to new_registration_path, inertia: { errors: user.errors }
    end
  end

  private
    def registration_params
      params.permit(:email_address, :password, :password_confirmation)
    end
end
