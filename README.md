Paypal Here Web SDK Sample App 

### Install
cd into both `client` and `server` directories and run `npm install`

### Run Server
`cd server` -> `node app`

### Run Client
`cd client` -> `ng serve`

### Complete a transaction

Open the app on `localhost:4200` . Go to the `setup paypal` link at the top left and click the `login with paypal` link. Enter your sandbox paypal business acount login info and you will be redirected back to the app. 
You will see the `Connect to mediator` button. Click it to connect to the mediator device running on the local machine. 
**Note: Make sure the paypal here device is plugged in via USB (DO NOT ATTEMPT TO CONNECT VIA BLUETOOTH**

Once connected (check the console for connection status) go to the `sell` tab. Add some items to the cart and click `Buy`. The device will show you the total and prompt you to insert the card. You can insert the card without being actually chared as this is just running agains the sandbox environment