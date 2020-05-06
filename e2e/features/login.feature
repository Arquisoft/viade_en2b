Feature: 
  As a user of the application
  I want to log in with my Solid account
  So that I can use the application's features

  Scenario: The user wants to log into application
    Given A user not logged in
    When The user has reached the page to login, clicks the button to do so and fills the data
    Then The user is logged in