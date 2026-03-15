document.addEventListener("DOMContentLoaded", function () {

  const overlay = document.getElementById("lightbox-overlay");
  const overlayImg = document.getElementById("lightbox-image");

  document.querySelectorAll(".lightbox").forEach(link => {
    link.addEventListener("click", function(e){
      e.preventDefault();
      overlay.style.display = "flex";
      overlayImg.src = this.href;
    });
  });

  overlay.addEventListener("click", function(){
    overlay.style.display = "none";
  });

});