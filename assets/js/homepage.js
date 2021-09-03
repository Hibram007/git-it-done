// defined variables
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

// created variable to house function to get user data from a web api
var getusersRepos = function(user) {
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        // when request is successful
        if (response.ok) {
          response.json().then(function(data) {
            displayRepos(data, user);
          });
          //if no user is found - input does not match any users
        } else {
          alert("Error: GitHub User Not Found");
        }
    })
    .catch(function(error) {
        // Notice this `.catch()` getting chained onto the end of the `.then()` method
        alert("Unable to connect to GitHub");
      });
}

// variable for the entire form
var userFormEl = document.querySelector("#user-form");

// variable for the form's input data
var nameInputEl = document.querySelector("#username");

// variable to house event handler- preventing browser default behaviour= refreshing at submission
var fromSubmitHandler = function(event) {
    event.preventDefault();
// get value from input element
var username = nameInputEl.value.trim();

if (username) {
    getusersRepos(username);
    nameInputEl.value = "";
} else {
    alert("Please enter a Github user");
}
    console.log(event);
};

var displayRepos = function(repos, searchTerm) {
    // if statment that will tell user that user is found but no repos
 if ( repos.length === 0) {
     repoContainerEl.textContent = "No repositories found.";
     return;
 }
    console.log(repos);
    console.log(searchTerm);

// clear old content
repoContainerEl.textContent = "";
repoSearchTerm.textContent = searchTerm;

// loop over repos
for (var i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;
  
    // create a container for each repo
    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
  
    // create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;
  
    // append to container
    repoEl.appendChild(titleEl);
  
   // create a status element - track which repos need help
var statusEl = document.createElement("span");
statusEl.classList = "flex-row align-center";

// check if current repo has issues or not
if (repos[i].open_issues_count > 0) {
  statusEl.innerHTML =
    "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
} else {
  statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
}

// append to container
repoEl.appendChild(statusEl);
    // append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
};

// adding a submit event handler to entire dynamic form element
userFormEl.addEventListener("submit", fromSubmitHandler);