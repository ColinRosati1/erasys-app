# Overveiw
Populate Erasys data from two API end points into grid views

## Tasks
Listen to Server Api calls. handle data and populate into grid view.


## Context
React, Jest, Flexbox, responsive

## API description
### `GET /api/search?length=32`
### `GET /api/search?length=32&sorting=[DISTANCE|ACTIVITY]`
Returns a list of user profiles with some basic information.

## Proposed Solution
Make one component that asynchronisly populates API data into App.
Check if data is in JSON
Array Map results into unique DOM elements with: Username, Age, Image, Location and distance, 
Headline, Relative last login time (e.g. 6 minutes ago)
One Api grabs users, id, name, pic, log, status. Second Api gets all other user data.
Create two react components to populate this data. One nested inside the other after retreived first set of data.
This API data will all be in AppContent component. 
Handle missing data with checks, error catch, or dummy data

## The strengths of this solution:
clean visualization
quick component rendering
modular components make for readability
clearly defined state handling


## weakness of solution:
Parent child relationship of components are not styled in a satisfying way.
lots of TODO details incomplete.
develop active, favourite, matching features
develop feature to sort API call.
I didnt get to any JEST testing. ALthough tried to catch API errors, and missing properties.
Backend has a bug were the image url key is undefined, not even an empty object.
No production build. Only works with $npm start


## TODOS

TODO make some sort of fixed position info element with active data. event listener on parent 
rather then nested hover parent in sass.

TODO round minutes to hours , days etc

## Steps to Run
1. Clone this repository
2. npm install
3. npm start at js-trail-task dir
4. cd erasys-app
5. npm start
