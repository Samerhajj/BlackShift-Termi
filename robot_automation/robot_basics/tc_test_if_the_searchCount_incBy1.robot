*** Settings ***
Library    SeleniumLibrary
Resource    Main.robot
Suite Setup    Open my Browser
Suite Teardown    Close browsers
Test Template    Login and Search

*** Test Cases ***  username    password    search
Test HR search for "Absolute appraisal methods"    test@gmail.com   123456    Absolute appraisal methods    Human Resources
#Test SW change category to Human Resources   mohamedsayedahmd@gmail.com   123456    Networking    Human Resources


*** Keywords ***
Login and Search
    [Arguments]     ${username}     ${password}     ${search}      ${category}
    Input username  ${username}
    Input pwd   ${password}
    click login button
    enter input search bar  ${search}
    select category  ${category}
    click on search bar button
    Wait Until Element Is Visible    xpath://*[@id="id_search_count_num"]
    ${search_count_before}      Get Text  xpath://*[@id="id_search_count_num"]
    Sleep    1s
    Go To   https://p7024.y2022.kinneret.cc/
    enter input search bar  ${search}
    select category  ${category}
    click on search bar button
    Wait Until Element Is Visible    xpath://*[@id="id_search_count_num"]
    ${search_count_after}      Get Text  xpath://*[@id="id_search_count_num"]

  # Convert search count values to integers
    ${count_before}    Evaluate    int(${search_count_before})
    ${count_after}    Evaluate    int(${search_count_after})

    # Compare the values
    Should Be True    ${count_before} == ${count_after - 1}

    Sleep    1s
    click logout link
