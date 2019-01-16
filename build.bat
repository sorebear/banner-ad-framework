@echo off
title Bologonese Banners Build

if exist ".node-version" for /f "tokens=*" %%a in (.node-version) do set nodeversion=%%a

where nodist >nul 2>&1 && (
  echo NODIST: NODE MANAGER IS INSTALLED, LOOKING FOR SPECIFIED VERSION
  if exist ".node-version" (
    echo SPECIFIC NODE VERSION SPECIFIED - CHECKING/INSTALLING NOW
    call nodist + %nodeversion%
  ) else (
    echo NO SPECIFIC NODE VERSION SPECIFIED
  )
) || (
  echo NODIST: NODE MANAGER NOT INSTALLED
)

if exist "node_modules" (
  echo NODE MODULES ALREADY INSTALLED
) else (
  echo INSTALLING NODE MODULES
  call npm install
)

call npm run build

pause
exit