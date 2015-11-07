# Quiz Server
[![Build Status](https://travis-ci.org/michaelrausch/Quiz-Server.svg?branch=master)](https://travis-ci.org/michaelrausch/Quiz-Server)

## Installation
1. Install NodeJS
2. Edit config/settings.json
3. Add your questions to config/questions.json
4. npm install
5. node bin/www
6. Enter 127.0.0.1:3000 into your browser.


## Todo
1. Clean up server code
2. Prevent cheating
3. Admin interface for adding questions
4. Add graphics to questions

## API
It is possible to obtain a list of questions (json) by accessing http://ADDRESS:3000/getquestions

## Customization 
1. You can change the port used in bin/www
2. CSS is in public/css/style.css
3. Quiz page is in views/index.jade
