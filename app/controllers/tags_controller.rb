class TagsController < ApplicationController
  def create
    tag = Current.user.tags.new(tag_params)
    if tag.save
      redirect_back fallback_location: notes_path, notice: "タグを追加しました"
    else
      redirect_back fallback_location: notes_path, inertia: { errors: tag.errors }
    end
  end

  def destroy
    tag = Current.user.tags.find(params[:id])
    tag.destroy
    redirect_back fallback_location: notes_path, notice: "タグを削除しました"
  end

  private
    def tag_params
      params.require(:tag).permit(:name)
    end
end
