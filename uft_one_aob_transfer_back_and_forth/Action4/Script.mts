AIUtil.SetContext Browser("creationtime:=0")

'===========================================================================================
'BP:  Get current balance from primary account
'===========================================================================================

CurrentBalance = split(AIUtil.FindTextBlock(micAnyText, micWithAnchorOnRight, AIUtil("check_mark", micAnyText, micWithAnchorOnRight, AIUtil("button", "NEW TRANSFER", micFromTop, 1))).GetValue)
'Force the variable to become a number instead of text
CurrentBalance(0) = CurrentBalance(0) + 1 - 1
print "The current balance is " & CurrentBalance(0)
'===========================================================================================
'BP:  Transfer parameter Transfer_Amount from primary account to secondary account
'===========================================================================================
AIUtil("button", "NEW TRANSFER", micFromTop, 1).Click

'===========================================================================================
'BP:  Transfer parameter Transfer_Amount from primary account to secondary account
'===========================================================================================

AIUtil.FindTextBlock("Transfer To My Own Account").Click
AIUtil.RunSettings.OCR.UseConfigSet UFT_OCR
FromAccount = split(AIUtil.FindTextBlock(micAnyText, micWithAnchorOnRight, AIUtil("down_triangle", micAnyText, micFromTop, 1)).GetValue, "-")
FromAccount(2) = trim(FromAccount(2))
ToAccount = split(AIUtil.FindTextBlock(micAnyText, micWithAnchorOnRight, AIUtil("down_triangle", micAnyText, micFromTop, 2)).GetValue, "-")
ToAccount(2) = trim(ToAccount(2))
AIUtil.RunSettings.OCR.UseConfigSet AI_OCR
print "From Account = " & FromAccount(2)
print "To Account = " & ToAccount(2)
AIUtil("button", "SEND").Highlight
AIUtil("text_box", "*Amount").SetText Parameter("AOB_Transfer_Amount")
AIUtil("button", "SEND").Click

'===========================================================================================
'BP:  Verify balance in primary account has decreased
'===========================================================================================
'Have to parse out the appended text of USD
NewBalance = split(AIUtil.FindTextBlock(micAnyText, micWithAnchorAbove, AIUtil.FindTextBlock("Net Balance")).GetValue, " ")
'Force the variable to become a number instead of text
NewBalance(0) = NewBalance(0) + 1 - 1
print "The new balance is " & NewBalance(0)
ExpectedBalance = CurrentBalance(0) - Parameter("AOB_Transfer_Amount")
print "The expected balance is " & ExpectedBalance
If ExpectedBalance = NewBalance(0) Then
	'Pass
	Reporter.ReportEvent micPass, "Balance Check", "The new balance " & NewBalance(0) & " equals the expected balance " & ExpectedBalance
Else
	'Fail
	Reporter.ReportEvent micFail, "Balance Check", "The new balance " & NewBalance(0) & " does not equal the expected balance " & ExpectedBalance
End If

