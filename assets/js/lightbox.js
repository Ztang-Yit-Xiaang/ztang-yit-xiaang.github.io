document.addEventListener("DOMContentLoaded", function () {

  const links = document.querySelectorAll(".lightbox-link");
  const overlay = document.getElementById("lightbox-overlay");
  const imgViewer = document.getElementById("lightbox-image");
  const closeBtn = document.getElementById("lightbox-close");

  const photoImgs = document.querySelectorAll(".photo-img");

  let currentIndex = 0;
  const images = [];

  /* -----------------------------
     LIGHTBOX SETUP
  ------------------------------*/

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
    imgViewer.src = images[currentIndex];
    document.body.style.overflow = "hidden";

  }

  function closeLightbox(){

    overlay.style.display = "none";
    document.body.style.overflow = "auto";

  }

  function showNext(){

    currentIndex = (currentIndex + 1) % images.length;
    imgViewer.src = images[currentIndex];

  }

  function showPrev(){

    currentIndex = (currentIndex - 1 + images.length) % images.length;
    imgViewer.src = images[currentIndex];

  }

  if(closeBtn){
    closeBtn.addEventListener("click", closeLightbox);
  }

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


  /* -----------------------------
     EXIF METADATA EXTRACTION
  ------------------------------*/

  photoImgs.forEach(function(photo){

    if(typeof EXIF === "undefined") return;

    EXIF.getData(photo, function(){

      const camera = EXIF.getTag(this, "Model");
      const lens = EXIF.getTag(this, "LensModel");
      const iso = EXIF.getTag(this, "ISOSpeedRatings");
      const aperture = EXIF.getTag(this, "FNumber");
      const shutter = EXIF.getTag(this, "ExposureTime");

      let exifHTML = "";

      if(camera) exifHTML += `📷 ${camera} `;
      if(lens) exifHTML += `🔍 ${lens} `;
      if(iso) exifHTML += `ISO ${iso} `;
      if(aperture) exifHTML += `f/${aperture.numerator/aperture.denominator} `;
      if(shutter) exifHTML += `⏱ ${shutter.numerator}/${shutter.denominator}s`;

      const container = photo.closest(".photo-card").querySelector(".photo-exif");

      if(container && exifHTML !== ""){
        container.innerHTML = exifHTML;
      }

    });

  });

});