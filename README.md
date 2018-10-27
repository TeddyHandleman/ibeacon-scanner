# ibeacon-scanner
Scans for iBeacon devices and other BLE peripherals

How to build Ionic and Cordova for iOS:

1. Install ionic and Cordova via npm: 
`$ npm install -g ionic cordova ios-deploy `

2. Create new project: 
`$ ionic start <projectName> <starterTemplate>`

3. Build:
` $ ionic cordova build ios -- --buildFlag="-UseModernBuildSystem=0"```

  If you have issues with Xcode-select and command line see: https://stackoverflow.com/questions/17980759/xcode-select-active-developer-directory-error/17980786#17980786  During build you will get a certificate signing error. 

4. Signing:
 - Open the project in Xcode by navigating to the project directory > platforms > iOS > and select the xcodeproj file  

    IMPORTANT: If using Xcode 10, go to File > Project Settings > Select Legacy Build System. If you don’t do this Xcode will not properly sign the package.  

    - Add your Apple ID under Preferences > Accounts  

    - Click on the project in the Navigator Panel, go to general, and add your Apple ID to the Team dropdown under Signing

    - Plug in your phone and hit the Play button
