## Gratitude App
---
### MVP:
A simple app that allows users to enter a short (tweet length) gratitude and have the app send them texts to remind them of past gratitudes. Users will be able to access their past gratitudes and will be able to easily tell how many gratitudes they have written and submitted. The app will then send an SMS message to the users a specified number of times during the week (users will be able to turn modify and turn on/off this setting). 

### Motivation:
People live very lonely lives and even more so during our current lockdown situation. The motivation behind this app is to help with the mental health aspect in a small way. Often times start writing out our gratitudes, which helps us start the day, but some days we just don't feel like there's anything to be grateful for, and we usually never really go back to review our past gratitudes. There are many apps out there that allow you to journal your gratitudes, and some that remind you through notifications to be grateful and give inspiring messages, but I've found those to be too generic and non-specific to my needs and often they are just ignored. 

This app encourages the user by reminding them of what they were grateful for in the past, in their own words. It's like the past self speaking truth and encouraging the present self. We chose to use SMS here because it feels more personal than an in-app notification. It should simulate a friend texting to encourage you. 

### Design Notes: 
The frontend interface should be peaceful, soft, and simple. It should be pleasing to the eye, and offer an uncluttered input area to encourage the user to enter a gratitude. It should be as simple as the Google homepage, where you have a text box to enter, and a submit button. We could think about adding animation and custom text input boxes to entice the user. 

### Stretch:
1. Migrate webapp to a React Native mobile app

2. Store the geolocation where each gratitude was made. From this geolocation info, we can populate a dynamic map and represent each map area where gratitudes are made. Each gratitude will be represented with a light, as more gratitudes are made, the light has a stronger intensity. The goal here would be to show all the gratitudes graphed out to encourage people. We could even record the times they are made and create a timeline of gratitude lights.


### Tech Stack
- Backend: Node.js
- Frontend: React.js
- SMS API: Twillio
- Data modeling + Map: D3.js

