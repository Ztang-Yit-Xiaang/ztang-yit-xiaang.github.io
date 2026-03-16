document.addEventListener("DOMContentLoaded", function () {

  const links = document.querySelectorAll(".lightbox-link");
  const overlay = document.getElementById("lightbox-overlay");
  const img = document.getElementById("lightbox-image");
  const closeBtn = document.getElementById("lightbox-close");

  let currentIndex = 0;
  const images = [];

  links.forEach((link, index) => {
    images.push(link.href);

    link.addEventListener("click", function(e){
      e.preventDefault();
      currentIndex = index;
      openLightbox();
    });
  });

  function openLightbox(){
    overlay.style.display = "flex";
    img.src = images[currentIndex];
    document.body.style.overflow = "hidden";
  }

  function closeLightbox(){
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  }

  function showNext(){
    currentIndex = (currentIndex + 1) % images.length;
    img.src = images[currentIndex];
  }

  function showPrev(){
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    img.src = images[currentIndex];
  }

  closeBtn.addEventListener("click", closeLightbox);

  overlay.addEventListener("click", function(e){
    if(e.target === overlay){
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function(e){

    if(overlay.style.display === "flex"){

      if(e.key === "Escape") closeLightbox();

      if(e.key === "ArrowRight") showNext();

      if(e.key === "ArrowLeft") showPrev();

    }

  });

});