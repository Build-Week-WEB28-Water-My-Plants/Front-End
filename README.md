# PlantWise
Product Vision: (https://docs.google.com/document/d/1By7cS41zD6Tl9LcNFRik487RcO0EOxL0Y87YwvQM8Yk/edit)
Deployed Site: (http://plantwise.netlify.com)

PlantWise is an app that allows you to neatly organize and manage the plants you have, so you never forget to water them.

---

## User Flow
1. User can register a new account, or log into a previously created account.
2. After registration, used can login and will be presented to their plant dashboard.
3. From the dashboard, the user has options to:
   * view list of species
   * create a plant
   * create a species
   * edit or delete any existing plants they have in their account
   * manage their account settings (updating phone number and password)
   
### Creating a plant
Input the following information for your plant:

* Nickname
* Location
* Species

### Creating a species
Input the following information for your species:

* Common name
* Scientific name
* Optional image URL
* Water (H2O) frequency (between 1-3 denoting how many times per day to water the plant)

### Managing your plants (edit and delete)
1. Click on "View More Information" on the plant you want to manage.
2. Click on "Edit Plant" to edit your plant.
  * Input your new plant nickname and location
  * Click on "Finish Editing" to complete the edit
3. Click on "Delete Plant" to delete your plant.

### Managing your account
1. Click on "Account Settings" from the plant dashboard.
2. Input a new phone number (or confirm same phone number) and input a new password (or confirm same password)

---

## Libraries and tools used:

### State Management
* Context API
* React Hooks

### Routing
* react-router-dom

### Other
* React
* styled-components
* axios

Graphics & Resources Used:
* Vectors and illustrations from (http://undraw.co)
* Images from Unsplash (http://unsplash.com)
