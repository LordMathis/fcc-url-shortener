# FreeCodeCamp URL Shortener Microservice

### User stories:

 *   I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
 *   When I visit that shortened URL, it will redirect me to my original link.

### Example creation usage:

[https://https://fccshort.herokuapp.com/new/https://www.google.com](https://fccshort.herokuapp.com/new/https://www.google.com)  
[https://fccshort.herokuapp.com/new/http://freecodecamp.com/news](https://fccshort.herokuapp.com/new/http://freecodecamp.com/news)  

### Example creation output:

`{ "original_url": "http://freecodecamp.com/news", "short_url": "https://fccshort.herokuapp.com/yekxn" }`

### Usage:

[https://fccshort.herokuapp.com/yekxn](/http://freecodecamp.com/news)

### Will redirect to:

[http://freecodecamp.com/news](http://freecodecamp.com/news)
