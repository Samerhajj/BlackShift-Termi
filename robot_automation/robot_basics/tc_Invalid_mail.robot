*** Settings ***
Library    SeleniumLibrary
Resource    Main.robot
Suite Setup    Open my Browser
Suite Teardown    Close browsers
Test Template    Invalid mail

*** Test Cases ***  username    password
Empty mail and Empty password    ${EMPTY}   ${EMPTY}
wrong mail wrong password    admin@gmail.com\   xyz
Wrong mail right password    adm@gmail.   adm123456
Wrong mail and Empty password    adm@.   ${EMPTY}


*** Keywords ***
Invalid mail
    [Arguments]     ${username}     ${password}
    Input username  ${username}
    Input pwd   ${password}
    click login button
    Error message should be visible mail not valid


#https://www.youtube.com/watch?v=xoZ36eh8V2A&ab_channel=SDET-QAAutomationTechie