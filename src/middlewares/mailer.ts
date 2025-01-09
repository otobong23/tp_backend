import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
import EmailTemplate, { WelcomeTemplate } from '../helpers/mail'
import React from 'react';
import ReactDOMServer from 'react-dom/server';


const transport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: false,
  port: 587,
  tls: {
    rejectUnauthorized: false,  // This is necessary in some environments (e.g., local testing)
  },
  auth: {
    user: process.env.NODE_MAIL_ADDRESS,
    pass: process.env.NODE_MAIL_PASSWORD,
  }
})



export const sendCode = async (to:string, code:string, firstName: string) => {
  
  const htmlContent = ReactDOMServer.renderToStaticMarkup(
    React.createElement(EmailTemplate, { firstName, code })
  );
  const sendMail = await transport.sendMail({
    from: process.env.NODE_MAIL_ADDRESS,
    to: to,
    subject: 'TradePhere: Verification Code',
    html: htmlContent,
  })
  return sendMail.accepted[0] === to
}

export const welcomeMessage = async (to:string, firstName: string) => {
  const htmlContent = ReactDOMServer.renderToStaticMarkup(
    React.createElement(WelcomeTemplate, { firstName })
  );
  const sendMail = await transport.sendMail({
    from: process.env.NODE_MAIL_ADDRESS,
    to: to,
    subject: 'TradePhere: Welcome Message',
    html: htmlContent,
  });
  return sendMail.accepted[0] === to
}