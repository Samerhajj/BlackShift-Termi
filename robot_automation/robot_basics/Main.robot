*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${LOGIN URL}    https://p7024.y2022.kinneret.cc/login
${BROWSER}  Chrome

#${Search}   Networking

*** Keywords ***
Open my Browser
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Maximize Browser Window
Close browsers
    Close All Browsers
Open Login Page
    Go To   ${LOGIN URL}
Input username
    [Arguments]    ${username}
    Wait Until Element Is Visible    xpath://input[@id="id_input_email_login"]
    Input Text    xpath://input[@id="id_input_email_login"]    ${username}
Input pwd
    [Arguments]    ${password}
    Wait Until Element Is Visible    xpath://input[@id="id_input_password_login"]
    Input Text    xpath://input[@id="id_input_password_login"]    ${password}
click login button
    Click Element    id:id_button_login

click logout link
    Wait Until Element Is Visible    xpath://a[@id="id_logout_mainnabbar"]
    Click Link    xpath://a[@id="id_logout_mainnabbar"]
Error message should be visible
    Wait Until Element Is Visible    xpath://*[@id="full_wrapper"]/div[1]/div[2]/div/div/div/form/div/div[2]/div[2]/label
    Page Should Contain    Wrong password
Dashboard page should be visible
    Element Should Be Visible    id:id_link_games


Error message should be visible mail not valid
    Wait Until Element Is Visible    xpath://*[@id="full_wrapper"]/div[1]/div[2]/div/div/div/form/div/div[2]/div[2]/label
    Page Should Contain     Not valid email

is login in
    Wait Until Element Is Visible    xpath://*[@id="id_logout_mainnabbar"]
    Page Should Contain Link    xpath://*[@id="id_logout_mainnabbar"]


enter input search bar
    [Arguments]    ${search}
    Wait Until Element Is Visible    xpath://input[@id="id_search_termi_page"]
    Input Text    xpath://input[@id="id_search_termi_page"]     ${search}

click on search bar button
    Click Element    xpath:/html/body/div[1]/div[1]/div[1]/div[1]/div/div/div[1]/i
check if the search work
        Wait Until Element Is Visible   //*[@id="id_term_card_title"]
        [Arguments]    ${term_title}
        Page Should Contain     ${term_title}

select category
    [Arguments]    ${category}
    Wait Until Element Is Visible   xpath://*[@id="category"]
    ${selector}     Get WebElement  xpath://*[@id="category"]
    Select From List By Label   ${selector}   ${category}
    Log To Console    ${\n}this is the category : | ${category}
    Sleep    0.5s



#---------------------------------------------------------------------------------------
#GAMES
click on game icon in the navbar
    Wait Until Element Is Visible    xpath://*[@id="id_link_games"]/a
    Click Element     xpath://*[@id="id_link_games"]/a
    Sleep   2s
#    ${game_icon}     Get WebElement  //*[@id="id_link_games"]
#    Click Element    ${game_icon}

#check if the container handle all the games exist
##    Wait Until Element Is Visible    xpath://*[@id="id_link_games"]
#    ${game_page_container}  Get Webelement      xpath:xpath://*[@id="id_game_page"]
#    Page Should Contain Element    ${game_page_container}


Open the game instructions BackWord Definitions
    Wait Until Element Is Visible     xpath://*[@id="id_BackWord Definitions_instructions"]
    ${BackWord_Definitions_instructions}    Get Webelement     xpath://*[@id="id_BackWord Definitions_instructions"]
    Click Element    ${BackWord_Definitions_instructions}
    Wait Until Element Is Visible   //*[@id="id_instructions_popup_title"]
    ${instructions_popup_title}     Get Webelement     //*[@id="id_instructions_popup_title"]
    Element Should Be Visible    ${instructions_popup_title}
    ${click_back}   Get Webelement     //*[@id="id_back_popup_button"]
    Click Element    ${click_back}
    Log To Console    BackWord Definitions | pass |
    Sleep    1s
Open the game instructions Memory Game
    Wait Until Element Is Visible     xpath://*[@id="id_Memory Game_instructions"]
    ${Memory_Game_instructions}    Get Webelement     xpath://*[@id="id_Memory Game_instructions"]
    Click Element    ${Memory_Game_instructions}
    Wait Until Element Is Visible   //*[@id="id_instructions_popup_title"]
    ${instructions_popup_title}     Get Webelement     //*[@id="id_instructions_popup_title"]
    Element Should Be Visible    ${instructions_popup_title}
    ${click_back}   Get Webelement     //*[@id="id_back_popup_button"]
    Click Element    ${click_back}
    Log To Console    Memory Game | pass |
    Sleep    1s
Open the game instructions Hangman Game
    Wait Until Element Is Visible     xpath://*[@id="id_Hangman Game_instructions"]
    ${Hangman_Game_instructions}    Get Webelement     xpath://*[@id="id_Hangman Game_instructions"]
    Click Element    ${Hangman_Game_instructions}
    Wait Until Element Is Visible   //*[@id="id_instructions_popup_title"]
    ${instructions_popup_title}     Get Webelement     //*[@id="id_instructions_popup_title"]
    Element Should Be Visible    ${instructions_popup_title}
    ${click_back}   Get Webelement     //*[@id="id_back_popup_button"]
    Click Element    ${click_back}
    Log To Console    Hangman Game | pass |
    Sleep    1s
Open the game instructions Translate Game
    Wait Until Element Is Visible     xpath://*[@id="id_Translate Game_instructions"]
    ${Translate_Game_instructions}    Get Webelement     xpath://*[@id="id_Translate Game_instructions"]
    Click Element    ${Translate_Game_instructions}
    Wait Until Element Is Visible   //*[@id="id_instructions_popup_title"]
    ${instructions_popup_title}     Get Webelement     //*[@id="id_instructions_popup_title"]
    Element Should Be Visible    ${instructions_popup_title}
    ${click_back}   Get Webelement     //*[@id="id_back_popup_button"]
    Click Element    ${click_back}
    Log To Console    Translate Game | pass |
    Sleep    1s

#    Wait Until Element Is Visible

#---------------------------------------------------------------------------------------
# Forgot Password
click forgot password button
    Wait Until Element Is Visible    xp
    ${forgot_password_button}   Get Webelement  ath://*[@id="id_forgot_password"]  xpath://*[@id="id_forgot_password"]
    Click Link    ${forgot_password_button}
    Sleep    1s
Input email forgot password
    [Arguments]    ${username}
    Wait Until Element Is Visible    //*[@id="user_email"]
    Input Text    //*[@id="user_email"]    ${username}
Click rest password button
    Wait Until Element Is Visible    xpath://*[@id="id_rest_password_button"]
    Click Element    xpath://*[@id="id_rest_password_button"]
check if we got error message mail not exist
    Wait Until Element Is Visible    xpath://*[@id="id_error_message_rest_password_notExistMail"]
    Page Should Contain Element      xpath://*[@id="id_error_message_rest_password_notExistMail"]
check if we got error message invalid mail
    Wait Until Element Is Visible    xpath://*[@id="id_error_message_rest_password_validEmail"]
    Page Should Contain Element    xpath://*[@id="id_error_message_rest_password_validEmail"]
Open my Browser and go to forgot password page
    Open Browser    https://p7024.y2022.kinneret.cc/forgotpassword    ${BROWSER}
    Maximize Browser Window