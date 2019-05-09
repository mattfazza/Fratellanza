**Fratellanza** is a simple application written with node.js and express to collect all the sales from my dad's pizza place's POS at the end of the day.  Despite its simplicity, this saves my dad about 2-3 hours every day.

I wrote this application last year, and hosted it on Heroku.  However, I never showed it to anyone simply because it exposed a lot of the inner workings of his business.  I decided to make a simplified version that didn't have that flaw.  This is it.  

Instead of using the actual server for this, I decided to make my own mock server with Node since the POS' REST API test server isn't up anymore.  I tried remaining as faithful as possible to the real API.  I modified a few things for simplicity's sake.  For example, the orderdetails.json is a huge simplification.  However, it does include the only fields we need in this case.

The access_token is a fake one.  That is not a vulnerability.  Since I made my own server, I can use whatever token.

**Running the project**
Running the project is easy:
1. clone the repository
2. navigate to the root directory of the project
3. $npm install
4. node server.js *in one terminal window*
5. node fratellanza.js *in another terminal window*

**Overview**
The application will first retrieve an OAuth token to be used with all the other calls, then a list with all orders matching today's day will be fetched; once the list is complete is go through each order placed on that day, and sum the total price of the order.