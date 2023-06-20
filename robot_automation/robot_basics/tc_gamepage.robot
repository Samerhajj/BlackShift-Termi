*** Settings ***
Library    SeleniumLibrary
Resource    Main.robot
Suite Setup    Open my Browser
Suite Teardown    Close browsers
Test Template    Test All games instructions

*** Test Cases ***  username    password
Test the games instructions   admin@gmail.com   admin12


*** Keywords ***
Test All games instructions
    Log To Console    ${\n}
    [Arguments]     ${username}     ${password}
    Input username  ${username}
    Input pwd   ${password}
    click login button
    click on game icon in the navbar
#    check if the container handle all the games exist
    Open the game instructions BackWord Definitions
    Open the game instructions Memory Game
    Open the game instructions Hangman Game
    Open the game instructions Translate Game
#    Click on popup back button
    click logout link



