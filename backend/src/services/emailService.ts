import nodemailer from "nodemailer";

export async function sendConfirmationEmail(email: string, username: string, confirmUrl: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Confirme ton inscription",
    html: `
      <h1>Bienvenue ${username} 👋</h1>
      <p>Merci de t'être inscrit ! Clique sur le lien ci-dessous pour activer ton compte :</p>
      <a href="${confirmUrl}">Confirmer mon compte</a>
    `,
  };

  await transporter.sendMail(mailOptions);
}
