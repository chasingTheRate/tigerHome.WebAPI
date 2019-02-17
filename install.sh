#!/bin/sh

# FUNCTIONS ################################################

nodeInstalled()
{
  if !(which node > /dev/null)
  then 
    return 0
  fi
  return 1
}

getPlistName(){
  PROJECT_NAME=$@
  IFS=-
  ARR=($@)
  FILENAME='com'
  for key in "${!ARR[@]}"; 
  do
  FILENAME+=".${ARR[$key]}"; 
  done
  FILENAME+=".plist"
  echo $FILENAME
}

installNmpPackages(){
  npm install
}

copyPlistToGlobalDaemons(){
  cp $@ /Library/LaunchDaemons
}

enableService(){
  launchctl load ~/Library/LaunchAgents/$@
}

# MAIN ################################################

echo 'Running install script'
if nodeInstalled
  then 
    echo 'Node not found. Please install and try again...'
    exit 1
  fi

NODE_VERSION=`node -v`
echo "Node $NODE_VERSION detected"

PROJECT_NAME=`basename $PWD`
PLIST_NAME=$(getPlistName $PROJECT_NAME)

installNmpPackages
copyPlistToGlobalDaemons $PLIST_NAME
enableService $PLIST_NAME