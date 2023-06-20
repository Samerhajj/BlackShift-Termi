*** Settings ***
Library    SeleniumLibrary
Resource    Main.robot
Suite Setup    Open my Browser
Suite Teardown    Close browsers
Test Template    Login and Search

*** Test Cases ***  username    password    search
Test HR search for "Absolute appraisal methods"    test@gmail.com   123456    Absolute appraisal methods    Human Resources
Test SW change category to Human Resources   mohamedsayedahmd@gmail.com   123456    Networking    Human Resources


*** Keywords ***
Login and Search
    [Arguments]     ${username}     ${password}     ${search}      ${category}
    Input username  ${username}
    Input pwd   ${password}
    click login button
    enter input search bar  ${search}
    select category  ${category}
    click on search bar button
    check if the search work    ${search}
    Sleep    1s
    click logout link
