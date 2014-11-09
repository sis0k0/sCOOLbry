POWERSHELL -command "(new-object System.Net.WebClient).DownloadFile('https://github.com/msysgit/msysgit/releases/download/Git-1.9.4-preview20140929/Git-1.9.4-preview20140929.exe', 'github-installer.exe')"
START /wait github-installer.exe
DEL github-installer.exe
SETX path "%PATH%;C:\Program Files (x86)\Git\bin"
SETX path "%PATH%;C:\Program Files\Git\bin"

GIT clone git://github.com/sis0k0/sCOOLbry.git

POWERSHELL -command "(new-object System.Net.WebClient).DownloadFile('http://nodejs.org/dist/v0.10.33/node-v0.10.33-x86.msi', 'nodejs-installer.msi')"
START /wait nodejs-installer.msi
DEL nodejs-installer.msi
SETX path "%PATH%;C:\Program Files (x86)\nodejs"
SETX path "%PATH%;C:\Program Files\nodejs"
SETX path "%PATH%;C:\Program Files (x86)\nodejs\node_modules\npm\bin"
SETX path "%PATH%;C:\Program Files\nodejs\node_modules\npm\bin"

POWERSHELL -command "(new-object System.Net.WebClient).DownloadFile('https://fastdl.mongodb.org/win32/mongodb-win32-i386-2.6.5-signed.msi', 'mongodb-installer.msi')"
START /wait mongodb-installer.msi
DEL mongodb-installer.msi
SETX path "%PATH%;C:\Program Files (x86)\MongoDB 2.6 Standard\bin"
SETX path "%PATH%;C:\Program Files\MongoDB 2.6 Standard\bin"

MD "C:/data/db"
CD ./sCOOLbry

IF EXIST "C:\Program Files\nodejs\npm.cmd" (

	CALL "C:\Program Files\nodejs\npm.cmd" install -g bower
	CALL "C:\Program Files\nodejs\npm.cmd" install -g grunt-cli
	CALL "C:\Program Files\nodejs\npm.cmd" install
) ELSE (
	CALL "C:\Program Files (x86)\nodejs\npm.cmd" install -g bower
	CALL "C:\Program Files (x86)\nodejs\npm.cmd" install -g grunt-cli
	CALL "C:\Program Files (x86)\nodejs\npm.cmd" install
)

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