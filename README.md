# Tiger Home WebAPI

##  Installation

1.  `npm install`

2.  Create plist

    Sample plist:

    ```
    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
      <dict>
          <key>RunAtLoad</key>
          <true/>
          <key>KeepAlive</key>
          <true/>
          <key>EnvironmentVariables</key>
          <dict>
            <key>PORT</key>
            <string>ENTER PORT #</string>
            <key>DB_HOST</key>
            <string>ENTER HOST NAME (localhost)</string>
            <key>DB_DATABASE</key>
            <string>ENTER DATEBASE NAME</string>
            <key>DB_USERNAME</key>
            <string>ENTER USERNAME</string>
            <key>DB_PASSWORD</key>
            <string>ENTER PASSWORD</string>
          </dict>
          <key>Label</key>
            <string>PLIST-APP-NAME-HERE</string>
          <key>ProgramArguments</key>
            <array>
              <string>/PATH-TO-NODE/node</string>
              <string>/PATH-TO-APP-ENTRY/app.js</string>
            </array>
          <key>StandardErrorPath</key>
            <string>/PATH-TO-STDOUT//stderr.log</string>
          <key>StandardOutPath</key>
            <string>/PATH-TO-STDOUT/stdout.log</string>
      </dict>
    </plist>
    ```

3.  Create .env file

    Add ENVIRONMENT VARIABLES:

        - DB_DATABASE
        - DB_USERNAME
        - DB_PASSWORD

4.  Run Shell Scripts

    `sh ./install.sh`