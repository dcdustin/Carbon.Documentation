@echo off

SET root=%cd%\Server\win
SET server=%root%\server

SET identity=generator
SET name=Generator
SET size=1000
SET seed=1
SET ip=localhost

rem Start up the server
cd "%server%"
RustDedicated.exe -nographics -batchmode -logs -silent-crashes ^
                  -server.hostname "%name%" ^
                  -server.identity "%identity%" ^
                  -server.netlog ^
                  -server.saveinterval 400 ^
                  -server.maxplayers 0 ^
				  -carbon.scriptdir "..\..\..\Plugins" ^
                  +server.seed %seed% ^
                  +server.worldsize %size% ^
                  -logfile "%identity%_log.txt" ^