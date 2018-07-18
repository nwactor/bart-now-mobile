# BART Now

Ever wish you knew how long you had to catch the train? BART Now gives commuters access to thes state of their favorite BART Stations in real-time with the touch of a button.

Visit the web demo at https://bart-now.herokuapp.com/. 
Note: the demo may not include all features included with and in development for the mobile app.

### Complete Features

* Live feed departing trains for every station
* Detects the nearest station to the user and displays it by default
* Map and Routing from the user's location to the chosen station, includes distance and travel time
* Option to set default station and travel mode that load whenever the app starts
* Choose between walking, bicycling, and driving directions

### Planned Features

* Predictions on whether or not the user will be able to catch a selected train, based on their mode of transport to the station
* Display more information about a train when it is selected; live countdown on detail page
* Polished UI
* Loading / Logo Screen
* Loading Indicator for train list
* Show number of cars, bike acceptable, and plaform number on train detail page

### Known Issues

* Departure times may need to update more frequently (actively being tested)
* Walking directions don't load sometimes (May be on Google's end?)
* Train Panel size flashes when back button is pressed
* ~~Travel time doesn't update when transportation mode changes~~ (Work-around found by expanding the webview portion of the app)
