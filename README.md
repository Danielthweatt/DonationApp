# The Love Foundation

## Description
Donation App was created for non-profits to quickly implement a platform to receive online donations. 

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Description](#description)
- [User Stories](#user-stories)
- [Built With](#built-with)
- [Installation](#installation)
- [Setting Up Stripe](#setting-up-stripe)
- [Contributors](#contributors)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## User Stories:
- [Skylar Morgan](https://app.xtensio.com/9ium2q4l)
- [Joff Waters](https://app.xtensio.com/9ium2q4l)

## Built With:
- [Create React App](https://github.com/facebook/create-react-app)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [Mongoose](http://mongoosejs.com/)
- [Material Design](https://material.io/design/)

## Installation
- Ensure you have MongoDB and Node set up before installation!
1. `git clone https://github.com/Danielthweatt/DonationApp.git` 
2. Open the repo in your code editor and install the dependencies by typing `npm install` in your terminal
3. Next, type `npm start` in your terminal - the application should then appear in your browser

## Setting Up Stripe
- In order to have the application function with your organization, you will need to set up a [Stripe](https://dashboard.stripe.com/register) account.
- Once you have an account, you'll need your API keys
- You can find your keys through your Stripe dashboard and hitting the Developers section (found in the left navbar)
- The publishable key will start with 'pk_test' and the secret will start with 'sk_test'
- In the DonationInput.js, Settings.js, and index.js (in the routes folder) you will need to plug your publishable key into the code - look for the comments
- Next, at the root, create a dir called stripe
- Inside the stripe dir create a file called config.js. Copy and paste the following code into it:
```
const keys = {
	SECRET_KEY: 'PUT YOUR SECRET KEY HERE'
};

module.exports = keys;
```

## Contributors:
- [Daniel Thweatt](https://github.com/Danielthweatt)
- [Maddy Fiksdal](https://github.com/m-fiks)
- [Majid Jamaleldine](https://github.com/Taxlife)
- [Robert Queeney](https://github.com/scoslo5512)
- [Cavan Wagg](https://github.com/CavanWagg)

## License

- [MIT License](https://github.com/Danielthweatt/DonationApp/blob/master/LICENSE)