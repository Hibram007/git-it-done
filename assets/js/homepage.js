// fetches data from a server side api - from this github api that commincates to data base
var getUserRepos = function() {
   fetch("https://api.github.com/users/octocat/repos");
};

//this will call function to console log "function was called"
getUserRepos();


