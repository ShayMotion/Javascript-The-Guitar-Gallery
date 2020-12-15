class DOM {
    static resetNav() {
      const navDiv = document.getElementById("nav")
      navDiv.innerHTML = Navbar.render()
    }
  
    static loadLoginForm() {
      const main = document.getElementById("main")
      main.innerHTML = Auth.renderLoginForm
    }
  
    static loadSignupForm() {
      const main = document.getElementById("main")
      main.innerHTML = User.renderSignupForm
    }
  
    static loadMainContainer() {
      this.resetNav()
      if (Auth.isSignedIn) {
        this.loadUserDashboard()
      } else {
        this.loadLoginForm()
      }
    }
  
    static loadUserDashboard() {
      const main = document.getElementById("main")
      main.innerHTML = `<h4>Logged in.. user dashboard goes here..</h4>`
    }
  }