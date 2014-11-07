IF EXIST "C:\Program Files\nodejs\node.exe" (
	START CMD /k "C:\Program Files\nodejs\node.exe" server.js
) ELSE (
	START CMD /k "C:\Program Files (x86)\nodejs\node.exe" server.js
)

IF EXIST "C:\Program Files (x86)\MongoDB 2.6 Standard\bin\mongod.exe" (
	START CMD /k "C:\Program Files (x86)\MongoDB 2.6 Standard\bin\mongod.exe"
) ELSE (
	START CMD /k "C:\Program Files (x86)\MongoDB 2.6 Standard\bin\mongod.exe"
)

START http://localhost:3030