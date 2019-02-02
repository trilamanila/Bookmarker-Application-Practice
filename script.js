document.getElementByID('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
  //Get form values
  var siteName = document.getElementByID('siteName').value;
  var siteURL = document.getElementByID('siteURL').value;

if(!validateForm(siteName, siteUrl)){
  return false;
}


  var bookmark = {
    name: siteName,
    url: siteURL
  }

  //Test if bookmarks is null
if(localStorage.getItem('bookmarks') === null){
  //Init array
  var bookmarks = [];
  //Add to array
  bookmarks.push(bookmark);
  //Set to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}else {
  //Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //Add bookmark to array
  bookmarks.push(bookmark);
  //Reset back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

//CLear form
document.getElementByID('myForm').reset();

//Re fetch bookmarks
fetchBookmarks();

//Prevent form from submitting
e.preventDefault();
}

//Delete bookmarks
function deleteBookmark(url){
  //Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
//Loop through bookmarks
for(var i = 0; i < bookmarks.length; i++)
  if(bookmarks[i].url == url){
    //Remove from array
    bookmarks.splice(i, 1);
  }
}
//Reset back to localStorage
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}



//Fetch bookmarksResults
function fetchBookmarks(){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

//Get output id
var bookmarksResults = document.getElementByID('bookmarksResults');

//Build output
bookmarksResults.innerHTML = '';
for(var i = 0; i < bookmarks.length; i++){
  var name = bookmarks[i].name;
  var url = bookmarks[i].url;

  bookmarksResults.innerHTML += '<div class="well">'+
                                '<h3>' +name+
                                ' <a class="btn btn-default" target="_blank" href="+'url+'">Visit</a> ' +
                                ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" target="blank" href="#">Delete</a> ' +
                                '</h3>'+
                                '</div>';
}
}

//Validates Form
function validateForm(siteName, siteUrl){
  if(!siteName || !siteURL){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }
  return true;
}
