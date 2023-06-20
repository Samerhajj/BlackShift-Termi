*** Settings ***
Library    SeleniumLibrary
Resource    Main.robot
Suite Setup    Open my Browser
Suite Teardown    Close browsers
Test Template    Login and Logout

*** Test Cases ***  username    password
Right mail and Right password    admin@gmail.com   admin12


*** Keywords ***
Login and Logout
    [Arguments]     ${username}     ${password}
    Input username  ${username}
    Input pwd   ${password}
    click login button
    click logout link



