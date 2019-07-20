const nodemailer = require('nodemailer');

const {
  MAIL_HOST,
  MAIL_PASS,
  MAIL_PORT,
  MAIL_USER,
} = process.env;

const createEmailHtml = text => `
  <div
    className="email"
    style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    "
  >
    ${text}
  </div>
`;

const transport = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

module.exports = {
  createEmailHtml,
  transport,
};
