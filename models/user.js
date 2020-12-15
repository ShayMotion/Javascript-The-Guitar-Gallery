class User {
    constructor(attributes) {
      this.id = attributes.id
      this.email = attributes.email
    }
  
    static get renderSignupForm() {
      return `
        <form class="auth-form" id="signup-form" action="#" method="post">
          <input id="signup-form-email-input" type="text" name="email" value="" placeholder="email">
          <input id="signup-form-password-input" type="password" name="password" value="" placeholder="password">
          <input class="auth-form" id="signup-form-submit" type="submit" value="Sign Up">
        </form>
      `
    }
  }