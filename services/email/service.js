const Mailgen = require("mailgen");

class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    switch (env) {
      case "development":
        this.link = "http://5532-212-92-249-85.ngrok.io";
        break;
      case "production":
        this.link = "link for production";
        break;
      default:
        this.link = "http://127.0.0.1:3000";
        break;
    }
  }

  createTemplateEmail(name, verifyToken) {
    const mailGenerator = new Mailgen({
      theme: "neopolitan",
      product: {
        name: "Phonebook",
        link: this.link,
      },
    });

    const email = {
      body: {
        name,
        intro: "Welcome to Phonebook! We're very excited to have you on board.",
        action: {
          instructions: "To get started with Phonebook, please click here:",
          button: {
            color: "#22BC66",
            text: "Confirm your account",
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
      },
    };

    return mailGenerator.generate(email);
  }

  async sendVerifyEmail(email, verifyToken) {
    const emailHTML = this.createTemplateEmail(email, verifyToken);
    const message = {
      to: email,
      subject: "Verify your email",
      html: emailHTML,
    };
    try {
      const result = await this.sender.send(message);
      console.log(result);
      return true;
    } catch (error) {
      console.log(`Ошибка ${error}`);
      return false;
    }
  }
}

module.exports = EmailService;
