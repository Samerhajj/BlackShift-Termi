*** Settings ***
Library    SeleniumLibrary
Resource    Main.robot
Suite Setup    Open my Browser and go to forgot password page
Suite Teardown    Close browsers
Test Template    Test forgot password

*** Test Cases ***  username    expected
1. Test forgot password - empty mail   ${EMPTY}     Not valid email
2. Test forgot password - not existed email  jaklsd@gom.ci    your mail not in our database
3. Test forgot password - not existed email    admin@gmail.co.il    your mail not in our database
4. Test forgot password - not valid email  admin@gmail.co.    Not valid email
5. Test forgot password - not existed email  mohamed@gmail.com    your mail not in our database
6. Test forgot password - not valid email  admin@gmail.co9   Not valid email
7. Test forgot password - not existed email   john@hotm ail.com     Not valid email
8. Test forgot password - not valid email   john@    Not valid email

*** Keywords ***
Test forgot password
    [Arguments]     ${username}     ${expected}
#    Log To Console    ${\n}
    Input email forgot password  ${username}
    Click rest password button
    Run Keyword If    '${expected}' == 'Not valid email'     check if we got error message invalid mail
    Run Keyword If    '${expected}' == 'your mail not in our database'    check if we got error message mail not exist