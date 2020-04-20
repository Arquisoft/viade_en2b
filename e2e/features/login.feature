Feature: Test
 Testing a User login

  Scenario: The user wants to log into application
    Given A user not logged in
    When The user has reached the page to login and clicks the button to do so
    Then The user is logged in