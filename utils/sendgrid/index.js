const sgMail = require("@sendgrid/mail");
const SENDER_EMAIL = require("../../constants/sendgrid/sender-email");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class Email {
  from = SENDER_EMAIL;

  constructor(to, templateId, dynamicTemplateData) {
    this.to = to;
    this.templateId = templateId;
    this.dynamicTemplateData = dynamicTemplateData;
  }

  async sendEmail() {
    try {
      const msg = {
        from: this.from,
        to: this.to,
        templateId: this.templateId,
        dynamicTemplateData: this.dynamicTemplateData,
      };
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Email;
