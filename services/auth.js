class Auth {
    static currentUser = {}
  
    static setCurrentUser(user) {
      this.currentUser = user
      console.log("current user is ", user)
    }
  
    static getCurrentUser() {
      API.get("/get_current_user")
        .then(response => {
          if (response.logged_in) {
            this.setCurrentUser(response.current_user)
            DOM.resetNav()
            DOM.loadMainContainer()
          } else {
            console.log(response.message)
          }
        })
    }
  
    static get isSignedIn() {
      return !!this.currentUser.email
    }
  
    static get renderLoginForm() {
      return `
        <form class="auth-form" id="login-form" action="#" method="post">
          <input id="login-form-email-input" type="text" name="email" value="" placeholder="email">
          <input id="login-form-password-input" type="password" name="password" value="" placeholder="password">
          <input class="auth-form" id="login-form-submit" type="submit" value="Log In">
        </form>
      `
    }
  
    static handleLogin() {
      const email = document.getElementById("login-form-email-input").value
      const password = document.getElementById("login-form-password-input").value
      this.loginOrSignup("/login", email, password)
    }
  
    static handleSignup() {
      const email = document.getElementById("signup-form-email-input").value
      const password = document.getElementById("signup-form-password-input").value
      this.loginOrSignup("/users", email, password)
    }
  
    static handleLogout() {
      this.setCurrentUser({})
      API.post("/logout")
        .then(console.log)
        .finally(() => DOM.loadMainContainer())
    }
  
    static loginOrSignup(url, email, password) {
      const userInfo = {
        user: {
          email,
          password,
        }
      }
  
      if (email && password) {
        API.post(url, userInfo)
        .then(this.handleResponse.bind(this))
        .catch(alert)
      } else {
        alert("You must provide both email and password")
      }
    }
  
    static handleResponse(response){
      if (response.error) {
        alert(response.error)
      } else {
        this.setCurrentUser(new User(response.current_user))
        DOM.resetNav()
        DOM.loadMainContainer()
      }
    }
  }