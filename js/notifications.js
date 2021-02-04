Array.from(document.querySelectorAll('.a')).forEach(function(element) {
  element.addEventListener("click", function() {
  document.getElementById("alert").classList.add("show");
  document.getElementById("alert").classList.remove("hide");
  document.getElementById("alert").classList.add("showAlert");
  setTimeout(function(){
      document.getElementById("alert").classList.remove("show");
      document.getElementById("alert").classList.add("hide");
  }, 5000);
});
});
document.getElementById('close-btn').addEventListener("click", function() {
    document.getElementById("alert").classList.remove("show");
    document.getElementById("alert").classList.add("hide");
});