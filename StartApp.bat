IF EXIST "C:\Program Files\nodejs\node.exe" (
	START CMD /k "C:\Program Files\nodejs\node.exe" server.js
) ELSE (
	START CMD /k "C:\Program Files (x86)\nodejs\node.exe" server.js
)

START http://localhost:3030