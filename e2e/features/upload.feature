Feature: Upload a file

  Scenario: Upload an image and link it to a route
    Given A logged in user in the routes list page
    When The user selects a route and uploads a file
    Then The user goes to the routes list page and finds the just-uploaded file attached to the route