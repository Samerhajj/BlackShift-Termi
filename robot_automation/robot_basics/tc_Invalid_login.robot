*** Settings ***
Library    SeleniumLibrary
Resource    Main.robot
Suite Setup    Open my Browser
Suite Teardown    Close browsers
Test Template    Invalid login

*** Test Cases ***  username    password
Right user empty pwd    admin@gmail.com   ${EMPTY}
Right user wrong pwd    admin@gmail.com   xyz
Wrong user right pwd    adm@gmail.com   adm123456
Wrong user empty pwd    adm@gmail.com   ${EMPTY}
Wrong user wrong pwd    adm@gmail.com   xyz


*** Keywords ***
Invalid login
    [Arguments]     ${username}     ${password}
    Input username  ${username}
    Input pwd   ${password}
    click login button
    Error message should be visible


#https://www.youtube.com/watch?v=xoZ36eh8V2A&ab_channel=SDET-QAAutomationTechie