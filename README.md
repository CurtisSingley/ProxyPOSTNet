# ProxyPOSTNet
Created for HackSC 2020

## Inspiration
With the huge increase in data available on the Internet, there has been an
unprecidented rise in corporate and personal digital survelliance of
individuals around the globe. We want to prevent cyber-stalking of individuals
while still maximizing freedom to all individuals equally across the Internet.
				We also wish to promote the mental well-being of Internet-users with
				the peace of mind from using this service.

## What it does
Proxy POSTNet is a network of users who share access tokens to their various
internet accounts. When users post on certain website, the content will be
posted by a different account. The user knows where all of their posts are, but
does not know the account info (username, password) of the account.
Additionally, the accounts that post the message also do not know who used
their account, hence it's untraceable. Each user also has the option of opting
to provide their access tokens to the pool of accounts, making this service
easily scalable and more robust.

## How I built it
We started from the backend, building RESTful APIs, then focused on the
frontend. The backend consists of a nodejs server running on AWS. There is a
3-legged OAuth process used for the user to provide his or her access tokens to
the proxy network. The user is prompted to allow their access token to be given
to the network, and if the user is currently not signed in, then the user must
first sign in and then give authorization to provide their access token. The
frontend is an HTML webpage created with Bootstrap and CSS that contains a form
that POSTs their content to the desired site.

## Challenges I ran into
The 3-legged OAuth process was the most challenging part of the project. It
would've been fairly simple if username and passwords were saved to the
database, but this is also an increased privacy and security risk. Also, the
Twitter API is really confusing. Postman also wasn't easy with creating POST
requests to Twitter.

## Accomplishments that I'm proud of
Finishing the project. Finally we made it! It's also nice to know that this
system could increase equity and prevent cyber-stalking.

## What I learned
How to provide authentication for users through access tokens. In discussing
the pros the cons of survelliance versus freedom, we now have a deeper
understanding of due process for individuals and legally of prosecuting
individuals.

## What's next for Proxy PostNet
Accomodate more sites to help users voice their thoughts without worring about
being bullied online. Expand the reach of Proxy POSTNet to more users in order
to increase the pool of user accounts. Harden the cyber security of the
databases to prevent hackers from stealing users' access tokens. Raise
awareness for human rights and fight for equity for all individuals no matter
which country they are from.

