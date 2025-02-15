document.addEventListener("DOMContentLoaded", function () {
  const imagePreview = document.getElementById("imagePreview");
  const uploadImage = document.getElementById("imageUpload");
  const uploadImageContainer = document.querySelector(
    ".upload-image__container"
  );
  const infoMessage = document.getElementById("infoMessage");
  const uploadMessage = document.querySelector(".upload-image__message");
  const imageHandleContainer = document.querySelector(
    ".image-handle-container"
  );
  const removeImageBtn = document.querySelector(".remove");
  const changeImageBtn = document.querySelector(".change");
  const iconInfo = document.querySelector(".icon-info");
  const inputs = document.querySelectorAll(".input");
  const errorMessages = document.querySelectorAll(".error-message");
  const submitButton = document.querySelector(".generate-btn");
  const header = document.querySelector(".header");
  const form = document.querySelector(".form");
  const congrats = document.querySelector(".congrats");

  const userName = document.querySelector(".name-user");
  const userEmail = document.querySelector(".email-user");
  const ticketImage = document.querySelector(".ticket__image");
  const profileName = document.querySelector(".profile-name");
  const githubProfile = document.querySelector(".github-name");
  const date = document.querySelector(".date");
  const ticketNumber = document.querySelector(".ticket__right");

  uploadImageContainer.addEventListener("click", function () {
    uploadImage.click();
  });

  uploadImage.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
      const validTypes = ["image/jpeg", "image/png"];

      // Check file type
      if (!validTypes.includes(file.type)) {
        infoMessage.textContent =
          "Invalid file type. Please upload a JPG or PNG.";
        infoMessage.style.color = "#f57463";
        iconInfo.style.color = "#f57463";
        return;
      }
      if (file.size > 500 * 1024) {
        infoMessage.textContent = "File is too large. Max size is 500KB.";
        infoMessage.style.color = "#f57463";
        iconInfo.style.color = "#f57463";
        return;
      }
      infoMessage.textContent =
        "Upload your photo (JPG or PNG, max size: 500KB).";
      infoMessage.style.color = "#d1d0d5";
      iconInfo.style.color = "#d1d0d5";
      const reader = new FileReader();
      reader.onload = function (e) {
        imagePreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
      imageHandleContainer.style.display = "flex";
      uploadMessage.style.display = "none";
    }
  });

  removeImageBtn.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent triggering file upload click
    imagePreview.src = "assets/images/icon-upload.svg"; // Reset to default icon
    uploadImage.value = ""; // Clear input value
    uploadMessage.style.display = "block"; // Show upload message again
    imageHandleContainer.style.display = "none"; // Hide remove/change buttons
  });

  changeImageBtn.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent triggering file upload click
    uploadImage.click();
  });

  function generateDate() {
    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = new Date().toLocaleDateString("en-US", options);
    return formattedDate;
  }

  function fillTicket() {
    const fullName = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const github = document.getElementById("github").value.trim();
    userName.textContent = fullName;
    userEmail.textContent = email;
    ticketImage.src = imagePreview.src;
    profileName.textContent = fullName;
    githubProfile.innerHTML = `<img src="assets/images/icon-github.svg" alt="GitHub Icon" /> ${github}`;
    date.textContent = generateDate() + " / Austin, TX";
    ticketNumber.textContent = "#" + Math.floor(10000 + Math.random() * 90000);
  }

  function displayCongrats() {
    fillTicket();
    header.style.display = "none";
    form.style.display = "none";
    congrats.style.display = "flex";
  }

  function validateInput(input) {
    const value = input.value.trim();
    if (input.id === "full-name") {
      const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/;
      return nameRegex.test(value);
    }
    if (input.id === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }
    if (input.id === "github") {
      const githubRegex = /^@[a-zA-Z0-9-]+$/;
      return githubRegex.test(value);
    }
    return true;
  }

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    let isValid = true;
    inputs.forEach((input, index) => {
      if (!validateInput(input)) {
        errorMessages[index].style.display = "flex";
        input.style.border = "2px solid #f57463";
        isValid = false;
      } else {
        errorMessages[index].style.display = "none";
        input.style.border = "2px solid #ccc";
      }
    });
    if (isValid) displayCongrats();
  });
});
