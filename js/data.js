/* exported data */
var data = [];

var previousSavedDataJSON = localStorage.getItem('bucket-place-storage');

if (previousSavedDataJSON !== null) {
  data = JSON.parse(previousSavedDataJSON);
}

window.addEventListener('beforeunload', function (event) {
  var savedDataJSON = JSON.stringify(data);
  localStorage.setItem('bucket-place-storage', savedDataJSON);
});
