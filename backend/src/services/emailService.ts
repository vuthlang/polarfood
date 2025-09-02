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

export async function sendResetPasswordEmail(email: string, token: string, resetUrl: string) {
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
    from: process.env.EMAIL_USER, // pareil que pour confirmation
    to: email,
    subject: "Réinitialisation mot de passe",
    html: `
    <h1>Réinitialisation de votre mot de passe</h1>
    <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien ci-dessous :</p>
    <a href="${resetUrl}">Réinitialiser mon mot de passe</a>
    <p>Si vous n'avez pas fait cette demande, ignorez cet email.</p>
  `,
  };

  await transporter.sendMail(mailOptions);
}

