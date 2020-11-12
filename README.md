# Notable Takeaways

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

An express.js app to write, save, and delete notes using JSON data format for storage and retrieval.

## Features
* Express.js framework to handle requests and responses
    * Including JSON method to handle API routing
* File system (fs) module to read and write files
* Path module to handle HTML routing

* Fully-functioning application allows the user to:
    * GET the note list from the database (in JSON format), if it exists
    * VIEW any previously saved notes
    * POST new notes to the database, automatically refreshing the note list
    * DELETE old notes from the database, automatically refreshing the note list

## Possible Extensions

* A major convenience would be to allow note editing and updating.
* Time permitting, I'd also add a more distinct set of stylings 

## Links

[Deployed application on Heroku](https://sleepy-beach-08943.herokuapp.com/) 

[GitHub Repository](https://github.com/BohdiCave/Notable-Takeaways)


