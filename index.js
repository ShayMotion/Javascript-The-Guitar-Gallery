document.addEventListener("DOMContentLoaded", init)

function init() {
  Auth.getCurrentUser()
  DOM.loadMainContainer()
  attachListeners()
}

function attachListeners() {
  const body = document.getElementById("body")
  body.addEventListener("click", handleBodyClick)
}

function handleBodyClick(event) {
  event.preventDefault()
  switch (event.target.className) {
    case "auth-form":
      handleAuthFormClick(event)
      break
    case "nav-link":
      handleNavLinkClick(event)
      break
    default:
      defaultClick(event)
  }
}

function handleAuthFormClick(event) {
  switch (event.target.id) {
    case "login-form-submit":
      Auth.handleLogin()
      break
    case "signup-form-submit":
      Auth.handleSignup()
      break
    default:
      defaultClick(event)
  }
}

function handleNavLinkClick(event) {
  switch (event.target.id) {
    case "login-link":
      DOM.loadLoginForm()
      break
    case "signup-link":
      DOM.loadSignupForm()
      break
    case "logout-link":
      Auth.handleLogout()
      break
    default:
      defaultClick(event)
  }
}

function defaultClick(event) { console.log("clicked on", event.target) }