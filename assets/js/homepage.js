
// created variable to house function to get user data from a web api
var getusersRepos = function(user) {
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        //formating returned data into json and then storing formated data
        response.json().then(function(data) {
            //loggin formated json data into the consol = array displayed
            console.log(data);
        });
    });
};

getusersRepos('facebook')