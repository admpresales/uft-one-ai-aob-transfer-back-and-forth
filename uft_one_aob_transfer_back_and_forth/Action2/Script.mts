AIUtil.SetContext Browser("creationtime:=0")
AIUtil.RunSettings.OCR.UseConfigSet UFT_OCR
AIUtil.Context.Freeze
'===========================================================================================
'BP:  Enter the user name and password from the parameters, click the login, then verify that the profile
'		icon is displayed to validate login
'===========================================================================================

AIUtil("text_box", "User Name").SetText Parameter("AOB_Username")
AIUtil("text_box", "Password").SetText Parameter("AOB_Password")
AIUtil("button", "LOGIN").Click
AIUtil.Context.UnFreeze
AIUtil.RunSettings.OCR.UseConfigSet AI_OCR
AIUtil("profile").CheckExists True

