const signUpForm = document.querySelector(".signup-form");
const signInForm = document.querySelector(".signin-form");
const createAcountBtns = document.querySelector(".account-Btns");
const SignUpButton = document.querySelector(".SignUpButton");
const SignInButton = document.querySelector(".SignInButton");
const formAlert = document.querySelector(".form-alert");
const formAlertText = document.querySelector(".form-alert-text");
const formAlertCloseBtn = document.querySelector(".form-alert-close");
const formAlertIcon = document.querySelector(".form-alert-icon");
let userSignedUp = false;
let userLoggedIn = false;

const formAlertVisible = () => {
  gsap.to(formAlert, {
    top: 0,
    duration: 0.6,
    ease: Power3.easeInOut,
  });
};

const formAlertVisibleSuccess = () => {
  gsap.to(formAlert, {
    top: 0,
    backgroundColor: "rgb(0, 128, 0, 0.7)",
    duration: 0.6,
    ease: Power3.easeInOut,
  });
};

const formAlertUnVisible = () => {
  gsap.to(formAlert, {
    top: "-10%",
    duration: 0.6,
    ease: Power3.easeInOut,
  });
};
const formAlertUnVisibleautomatic = () => {
  setTimeout(() => {
    gsap.to(formAlert, {
      top: "-10%",
      duration: 0.6,
      ease: Power3.easeInOut,
    });
  }, 3000);
};

const signUpFormFunctionality = () => {
  SignUpButton.addEventListener("click", () => {
    gsap.to(signUpForm, {
      x: 0,
      opacity: 1,
      duration: 0.4,
      ease: Power3.easeInOut,
    });

    gsap.to(signInForm, {
      x: "-150%",
      opacity: 0,
      duration: 0.4,
      ease: Power3.easeInOut,
    });
  });

  SignInButton.addEventListener("click", () => {
    gsap.to(signInForm, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      ease: Power3.easeInOut,
    });

    gsap.to(signUpForm, {
      opacity: 0,
      x: "150%",
      duration: 0.4,
      ease: Power3.easeInOut,
    });
  });
  signUpForm.addEventListener("submit", (a) => {
    a.preventDefault();
    const signUpFormData = new FormData(signUpForm);
    let signUpUserInfo = {
      name: signUpFormData.get("name"),
      email: signUpFormData.get("signupemail"),
      password: signUpFormData.get("signuppassword"),
      confirmPassword: signUpFormData.get("signupconfirmpassword"),
    };

    if (
      !signUpUserInfo.name ||
      !signUpUserInfo.email ||
      !signUpUserInfo.password ||
      !signUpUserInfo.confirmPassword
    ) {
      formAlertVisible();
      formAlertUnVisibleautomatic();
      formAlertCloseBtn.addEventListener("click", formAlertUnVisible);
      formAlertText.textContent = " Fill All Field";
    } else if (signUpUserInfo.password.length < 8) {
      formAlertVisible();
      formAlertUnVisibleautomatic();
      formAlertCloseBtn.addEventListener("click", formAlertUnVisible);
      formAlertText.textContent = " Passowrd At Least Eight Character";
    } else if (signUpUserInfo.password !== signUpUserInfo.confirmPassword) {
      formAlertVisible();
      formAlertUnVisibleautomatic();
      formAlertCloseBtn.addEventListener("click", formAlertUnVisible);
      formAlertText.textContent = " Passowrd Does Not Match";
    } else {
      let signUpUserInfoSave =
        JSON.parse(localStorage.getItem("signUpUserInfo")) || [];

      let signUpUserInfoSaveCheck = signUpUserInfoSave.find((user) => {
        return user.email === signUpUserInfo.email;
      });

      if (signUpUserInfoSaveCheck) {
        formAlertVisible();
        formAlertUnVisibleautomatic();
        formAlertCloseBtn.addEventListener("click", formAlertUnVisible);
        formAlertText.textContent = " User Already Exist Sign In";
        signUpForm.reset();
      } else {
        userSignedUp = true;
        signUpForm.reset();
        signUpUserInfoSave.push(signUpUserInfo);
        localStorage.setItem(
          "signUpUserInfo",
          JSON.stringify(signUpUserInfoSave)
        );
        formAlertVisibleSuccess();
        formAlertUnVisibleautomatic();
        formAlertCloseBtn.addEventListener("click", formAlertUnVisible);
        formAlertIcon.classList.replace(
          "ri-alert-fill",
          "ri-check-double-fill"
        );
        formAlertText.textContent = " Sign Up SuccessFully";
      }
    }
  });
  signInForm.addEventListener("submit", (b) => {
    b.preventDefault();

    const signInFormData = new FormData(signInForm);
    if (
      !signInFormData.get("signinemail") ||
      !signInFormData.get("signinpassword")
    ) {
      formAlertVisible();
      formAlertUnVisibleautomatic();
      formAlertCloseBtn.addEventListener("click", formAlertUnVisible);
      formAlertText.textContent = " Fill All Field";
    } else {
      let saveUser = JSON.parse(localStorage.getItem("signUpUserInfo")) || [];

      let matchingSaveData = saveUser.find((user) => {
        return user.email === signInFormData.get("signinemail");
      });

      if (matchingSaveData) {
        userLoggedIn = true;
        signInForm.reset();
        formAlertVisibleSuccess();
        formAlertUnVisibleautomatic();
        formAlertCloseBtn.addEventListener("click", formAlertUnVisible);
        formAlertIcon.classList.replace(
          "ri-alert-fill",
          "ri-check-double-fill"
        );
        formAlertText.textContent = " Sign in SuccessFully";
      } else {
        signUpForm.reset();
        formAlertVisible();
        formAlertUnVisibleautomatic();
        formAlertCloseBtn.addEventListener("click", formAlertUnVisible);
        formAlertText.textContent = " User Not Found Sign Up";
      }
    }
  });
};
signUpFormFunctionality();
console.log();
