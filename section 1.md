CHAPTER 1

CHAPTER 2

section 1
sudo apt update && sudo apt full-upgrade

section 2
https://nodered.org/docs/getting-started/raspberrypi

sudo apt install build-essential git curl

bash <(curl -sL https://raw.githubusercontent.com/node-red/linux-installers/master/deb/update-nodejs-and-nodered)

section 3
sudo systemctl enable nodered.service

CHAPTER 3

section 1
https://nodered.org/docs/user-guide/runtime/configuration#runtime-configuration

cd /home/pi/.node-red/
vim settings.js

CHAPTER 4
ifconfig, ip a or ip r

CHAPTER 5

section 1
https://nodered.org/docs/user-guide/runtime/securing-node-red#usernamepassword-based-authentication

cd /home/pi/.node-red/
cp settings.js settings.js_backup
vim settings.js

node-red admin hash-pw

sudo systemctl restart nodered.service 

section 3 
node function
https://nodered.org/docs/user-guide/writing-functions

section 4
node catch - scopte and context
https://nodered.org/docs/user-guide/context

section 6 
store de context
https://nodered.org/docs/api/context/store/localfilesystem
https://nodered.org/docs/user-guide/context#context-stores

CHAPTER 6


