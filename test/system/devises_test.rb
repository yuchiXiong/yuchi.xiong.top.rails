require "application_system_test_case"

class DevisesTest < ApplicationSystemTestCase
  # * 登录
  test "visiting the index" do
    ActionController::Base.stub_any_instance(:verify_rucaptcha?, true) do
      visit new_user_session_url

      assert_title '登录 - Burogu'

      assert_selector ".user_card > h4", text: "登录"

      assert_selector "form.new_user input#user_email"
      assert_selector "form.new_user input#user_password"
      assert_selector "form.new_user img"
      assert_selector "form.new_user input[type=submit]"

      within("#new_user") do
        fill_in 'user[email]', with: 'yuchi.xiong@foxmail.com'
        fill_in 'user[password]', with: '123456'

        click_button '登录'
      end

    end

  end
end
