AIUtil.SetContext Browser("creationtime:=0")

AIUtil.Scroll "up", 10

AIUtil("profile").Click
AIUtil("power").Click
Browser("creationtime:=0").Close
