Feature: 
  As a user of the application
  I want to upload a file to a route
  So that me and the people I shared the route with can see it attached to that specific route

  Scenario: Upload a file and link it to a route
    Given A logged in user in the routes list page
    When The user selects a route
        And Uploads a file
    Then The user goes to the routes list page
        And views the files attached to the route
        And finds the just-uploaded file