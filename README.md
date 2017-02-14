# Portfolio Website
![Portfolio Website](https://cosmicjs.imgix.net/b2f19ca0-f26b-11e6-8893-11cd3268b677-portfolio-website.png?w=1200)
###[View Demo](https://cosmicjs.com/apps/portfolio-website/demo)
Portfolio website powered by Cosmic JS using the [GraphQL API](https://cosmicjs.com/docs/graphql).  Includes portfolio management and contact form (powered by MailGun).

1. [Log in to Cosmic JS](https://cosmicjs.com).
2. Create a Bucket.
3. Go to Your Bucket > Apps.
4. Install the [Portfolio Website App](https://cosmicjs.com/apps/portfolio-website).
5. Deploy your Email Capture App to the Cosmic App Server at Your Bucket > Web Hosting.

###Getting Started
```
git clone https://github.com/cosmicjs/portfolio-website
cd portfolio-website
yarn
```
####Config
Copy the `config/production.js`, add your config values and save as a development config file `config/development.js`. (Never push config to your GitHub repo).  This follows the [12 Factor App](https://12factor.net) guidelines.
####Run in development
```
yarn development
```
####Run in production
```
yarn start
```
####Start app connected to your Cosmic JS Bucket
```
COSMIC_BUCKET=your-bucket-slug yarn start
```
Open [http://localhost:3000](http://localhost:3000).
###Setting up MailGun
1. Go to MailGun and login to your account or setup a new account.
2. Get your api key and domain.
3. Add your api key and domain to your environment valiables, or hard code them into `config/production.js` (not advised).
