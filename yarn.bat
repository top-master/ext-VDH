@echo off
setlocal

REM "%~dp0" securely gives the absolute path to where this script is located
set "YARN_DIR=%~dp0.yarn\releases"

REM Advertise colour support to every Node process Yarn spawns via
REM its built-in script shell. Without this, Yarn pipes child stdio
REM through its logger and any chalk-based tool (nest-cli, jest,
REM eslint, fetch-shared, ...) sees a non-TTY and turns colours
REM off. cmd.exe has no portable TTY check, so we only set the
REM variable when the caller has not already pinned it (including
REM to "0" for non-interactive pipelines).
if not defined FORCE_COLOR set "FORCE_COLOR=1"

REM Scan for the Javascript file inside that folder
for %%f in ("%YARN_DIR%\yarn-*.cjs") do (
    set "YARN_FILE=%%f"
    goto :runYarn
)

echo Error: Local yarn-*.cjs file not found in %YARN_DIR% >&2
exit /b 1

:runYarn
node "%YARN_FILE%" %*

REM Propagate exact exit codes to parent callers/CI systems
exit /b %ERRORLEVEL%
