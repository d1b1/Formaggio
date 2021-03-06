# Formaggio Search Engine
This repo provides a the node.js API code setting up Webhooks on Heroku. This codebased provides the webhook code to accept webhook events from Takeshape.io and populate data in Algolia.

### Want to get Started?
If you are following the Medium.com Project to build own search engine, use this to get started.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

#### FYI - Formagg.io is a cheese search engine. This repo is used for a 'Mechanics of Search' class at Lesley University.

#### Environment Settings
The following at
- `ALGOLIA_ADMIN_KEY` - An Algolia Admin API Key. Allows writes.
- `ALGOLIA_APPID` - Algolia Application ID.
- `TAKESHAPE_KEY` - Takeshape Project Id
- `TAKESHAPE_KEY` - Takeshape API Key (assumes a read or read/write API key)

#### Endpoints
This creates two endpoints.

- `/webhook` - Expects a Takeshape.io Webhook Post. Uses the content type and content ID to post to Algolia.
- `/rebuild?contentType=` - Does a full port/rebuild of data from a Takeshape.io content type to Agolia index.

#### Index Names
This code creates an index in Algolia using the Takeshape content Id.

### Stack Elements
- __Takeshape.io__ - Content-as-a-Service - Provide data modeling UI.
- __Algolia.com__ - Search-as-a-Service - Provides Search Index.
- __Heroku.com__ - Webhook endpoint hosting.

### Costs
All three of these services offer free plans that allow students to build an end to end search engine without spending a dime.

### Example Sites
The following are specialized domains for different topics and interests; from types of berries, to the best roads to drive fast.

1. Farms Near Me (https://farmsnearme.netlify.com/)
1. Vivo Vinoa (https://vivovino.netlify.com/)
1. Chug (https://chug.netlify.com/)
1. Berry Land (https://berryland.netlify.com/)
1. Driven (https://roadsdriven.netlify.com/)
1. Harry Potter Land (https://harrypotterland.netlify.com/)
1. Hidden Bookstores (https://hidden-bookstore.netlify.com/)
1. Pot Head (https://pothead.netlify.com/)
1. Ice Cream Land (https://icecreamland.netlify.com/)
1. Sunscreens (https://sunscreens.netlify.com/)

