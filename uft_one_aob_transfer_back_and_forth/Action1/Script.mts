﻿'Declare variables that will be used in the script
Dim BrowserExecutable, oShell

'Statements to ensure that the OCR service that the AI Object Detection (AIOD) utilizes is running on the machine
Set oShell = CreateObject ("WSCript.shell")
oShell.run "powershell -command ""Start-Service mediaserver"""
Set oShell = Nothing

'Loop to close all open browsers
While Browser("CreationTime:=0").Exist(0)   													
	Browser("CreationTime:=0").Close 
Wend

'Set the BrowserExecutable variable to be the .exe for the browser declared in the datasheet
BrowserExecutable = Parameter.Item("Browser") & ".exe"

'Launch the browser specified in the data table
SystemUtil.Run BrowserExecutable,"","","",3												

'Set the variable for what application (in this case the browser) we are acting upon
Set AppContext=Browser("CreationTime:=0")												

'Clear the browser cache to ensure you're getting the latest forms from the application
AppContext.ClearCache																		

'===========================================================================================
'BP:  Nav to the login URL of the application
'===========================================================================================
AppContext.Navigate Parameter.Item("URL")	

'Maximize the application to give the best chance that the fields will be visible on the screen
AppContext.Maximize																		

'Wait for the browser to stop spinning
AppContext.Sync																			

'Tell the AI engine to point at the application
AIUtil.SetContext AppContext																

'===========================================================================================
'BP:  Verify that the username and password fields and Login button appear
'===========================================================================================

AIUtil.RunSettings.OCR.UseConfigSet UFT_OCR
AIUtil.Context.Freeze

'===========================================================================================
'BP:  If the previous session didn't logoff, then have the script logoff before checking login screen is visible
'===========================================================================================
If AIUtil("text_box", "User Name").Exist(0) = FALSE Then
	AIUtil.Context.UnFreeze
	AIUtil("button", "OPEN").Click
	AIUtil("profile").Click
	AIUtil("power").Click
	AIUtil.Context.Freeze
End If

AIUtil("text_box", "User Name").CheckExists True
AIUtil("text_box", "Password").CheckExists True
AIUtil("button", "LOGIN").CheckExists True
AIUtil.Context.UnFreeze
AIUtil.RunSettings.OCR.UseConfigSet AI_OCR
