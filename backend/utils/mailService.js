
// // backend/utils/mailService.js

// import nodemailer from "nodemailer";

// console.log("📨 Gmail MailService Loaded");

// function getGreeting() {
//   const indiaTime = new Date().toLocaleString("en-US", {
//     timeZone: "Asia/Kolkata",
//     hour: "numeric",
//     hour12: false,
//   });

//   const hour = parseInt(indiaTime.split(":")[0]);

//   if (hour < 12) return "Good morning";
//   if (hour < 17) return "Good afternoon";
//   return "Good evening";
// }

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_APP_PASSWORD,
//   },
// });

// export async function sendCustomerCredentials({ toEmail, name, tempPassword }) {
//   const greeting = getGreeting();

//   const html = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>PM Dashboard Credentials</title>
//       <style>
//         @media only screen and (max-width: 600px) {
//           .container { max-width: 100% !important; }
//           .content-wrapper { padding: 20px !important; }
//         }
//       </style>
//     </head>
//     <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #fef3f4 0%, #fce7f3 50%, #fef3f4 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
//       <table role="presentation" style="width: 100%; border-collapse: collapse;">
//         <tr>
//           <td align="center" style="padding: 30px 20px;">
            
//             <!-- Main Container -->
//             <table role="presentation" class="container" style="max-width: 750px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(244, 63, 94, 0.15), 0 0 0 1px rgba(244, 63, 94, 0.05);">
              
//               <!-- Logo Section -->
//               <tr>
//                 <td align="center" style="padding: 28px 40px; background: linear-gradient(135deg, #f43f5e 0%, #fb923c 100%); position: relative;">
//                   <!-- Add your logo here -->
//                   <!-- Example: <img src="${process.env.FRONTEND_URL}/logo.png" alt="Logo" style="height: 55px; width: auto; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));"> -->
//                   <div style="height: 55px; display: inline-flex; align-items: center; justify-content: center;">
//                     <div style="background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(12px); padding: 14px 32px; border-radius: 16px; border: 1.5px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);">
//                       <span style="color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">PM Dashboard</span>
//                     </div>
//                   </div>
//                 </td>
//               </tr>

//               <!-- Content Section - Horizontal Layout -->
//               <tr>
//                 <td class="content-wrapper" style="padding: 40px 45px;">
                  
//                   <table role="presentation" style="width: 100%; border-collapse: collapse;">
//                     <tr>
//                       <!-- Left Column: Greeting & Info -->
//                       <td style="vertical-align: top; width: 55%;">
                        
//                         <!-- Greeting -->
//                         <h1 style="margin: 0 0 12px; color: #111827; font-size: 26px; font-weight: 700; line-height: 1.2;">
//                           Hi ${name}! 👋
//                         </h1>
                        
//                         <p style="margin: 0 0 24px; color: #6b7280; font-size: 15px; line-height: 1.5;">
//                           ${greeting}, hope you're doing well ✨
//                         </p>

//                         <!-- Credentials Box -->
//                         <div style="background: linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%); border-left: 4px solid #f43f5e; border-radius: 14px; padding: 20px; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(244, 63, 94, 0.08);">
//                           <p style="margin: 0 0 16px; color: #374151; font-size: 15px; font-weight: 600;">
//                             Your login credentials:
//                           </p>
                          
//                           <div style="margin-bottom: 14px;">
//                             <p style="margin: 0 0 4px; color: #9ca3af; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px;">
//                               Email Address
//                             </p>
//                             <p style="margin: 0; color: #111827; font-size: 14px; font-weight: 500; word-break: break-all;">
//                               ${toEmail}
//                             </p>
//                           </div>

//                           <div>
//                             <p style="margin: 0 0 6px; color: #9ca3af; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px;">
//                               Temporary Password
//                             </p>
//                             <div style="background-color: #ffffff; border: 2px dashed #fda4af; border-radius: 10px; padding: 10px 14px; display: inline-block; transition: all 0.3s ease;">
//                               <code style="color: #f43f5e; font-size: 16px; font-weight: 600; font-family: 'Courier New', monospace; letter-spacing: 1.2px;">
//                                 ${tempPassword}
//                               </code>
//                             </div>
//                           </div>
//                         </div>

//                       </td>

//                       <!-- Right Column: Warning & CTA -->
//                       <td style="vertical-align: top; width: 45%; padding-left: 20px;">
                        
//                         <!-- Warning Box -->
//                         <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #f59e0b; border-radius: 14px; padding: 18px; margin-bottom: 24px; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.1);">
//                           <p style="margin: 0; color: #92400e; font-size: 13px; line-height: 1.5; font-weight: 500;">
//                             <strong style="font-size: 14px;">⚠️ Important</strong><br/>
//                             Change your password immediately after first login for security.
//                           </p>
//                         </div>

//                         <!-- CTA Button -->
//                         <div style="text-align: center; margin-bottom: 40px;">
//                           <a href="${process.env.FRONTEND_URL}" 
//                              style="display: inline-block; padding: 15px 36px; background: linear-gradient(135deg, #f43f5e 0%, #fb923c 100%); color: #ffffff; text-decoration: none; border-radius: 14px; font-size: 15px; font-weight: 600; box-shadow: 0 8px 24px rgba(244, 63, 94, 0.35), 0 0 0 1px rgba(255,255,255,0.1) inset; transition: all 0.3s ease; text-shadow: 0 1px 2px rgba(0,0,0,0.1);">
//                             Access Dashboard →
//                           </a>
//                         </div>
//                       </td>
//                     </tr>
//                   </table>

//                   <!-- Help Text -->
//                   <p style="margin: 24px 0 0; color: #9ca3af; font-size: 13px; line-height: 1.5; text-align: center; padding-top: 20px; border-top: 1px solid #f3f4f6;">
//                     Having trouble? <a href="mailto:support@pmdashboard.com" style="color: #f43f5e; text-decoration: none; font-weight: 600;">Contact support</a>
//                   </p>

//                 </td>
//               </tr>

//               <!-- Footer -->
//               <tr>
//                 <td style="padding: 24px 40px; background: linear-gradient(135deg, #fef2f2 0%, #fff1f2 100%); border-top: 1px solid #ffe4e6;">
//                   <table role="presentation" style="width: 100%; border-collapse: collapse;">
//                     <tr>
//                       <td style="text-align: center;">
//                         <p style="margin: 0 0 6px; color: #9ca3af; font-size: 12px; line-height: 1.4;">
//                           This is an automated message. If you didn't request this, please ignore.
//                         </p>
//                         <p style="margin: 0; color: #d1d5db; font-size: 11px;">
//                           © ${new Date().getFullYear()} PM Dashboard. All rights reserved.
//                         </p>
//                       </td>
//                     </tr>
//                   </table>
//                 </td>
//               </tr>

//             </table>

//           </td>
//         </tr>
//       </table>
//     </body>
//     </html>
//   `;

//   console.log("📧 Sending email to:", toEmail);

//   return await transporter.sendMail({
//     from: process.env.EMAIL_FROM,
//     to: toEmail,
//     subject: "Your PM Dashboard Login Credentials 🔑",
//     html,
//   });
// }





// // backend/utils/mailService.js

// import nodemailer from "nodemailer";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // FIX LOGO PATH HERE
// const logoPath = path.join(
//   __dirname,
//   "../../frontend/public/Micrologic_new_logo.png"
// );


// console.log("📨 Gmail MailService Loaded");

// function getGreeting() {
//   const indiaTime = new Date().toLocaleString("en-US", {
//     timeZone: "Asia/Kolkata",
//     hour: "numeric",
//     hour12: false,
//   });

//   const hour = parseInt(indiaTime.split(":")[0]);

//   if (hour < 12) return "Good morning";
//   if (hour < 17) return "Good afternoon";
//   return "Good evening";
// }

// const transporter = nodemailer.createTransport({
//   service: "email",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// /* ============================================================
//    SEND LOGIN CREDENTIAL EMAIL  (No changes made here)
// ============================================================ */
// export async function sendCustomerCredentials({ toEmail, name, tempPassword }) {
//   const greeting = getGreeting();

// const html = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
// <meta charset="UTF-8" />
// <meta name="viewport" content="width=device-width, initial-scale=1.0" />
// <title>PM Dashboard Credentials</title>
// <!--[if mso]>
// <style type="text/css">
//   body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
// </style>
// <![endif]-->
// </head>

// <body style="
//   margin: 0; 
//   padding: 0; 
//   background: linear-gradient(135deg, #e0e7ff 0%, #f3f4f6 100%);
//   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
// ">

// <table role="presentation" width="100%" style="border-collapse: collapse; min-height: 100vh;">
//   <tr>
//     <td align="center" style="padding: 40px 20px;">

//       <!-- Main Card -->
//       <table role="presentation" width="600" style="
//         background: #ffffff;
//         border-radius: 20px;
//         box-shadow: 
//           0 20px 60px rgba(79, 70, 229, 0.15),
//           0 8px 16px rgba(79, 70, 229, 0.08);
//         overflow: hidden;
//         border: 1px solid rgba(224, 231, 255, 0.8);
//       ">

//         <!-- Gradient Header with Logo -->
//         <tr>
//           <td style="
//             background: linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #7c3aed 100%);
//             padding: 0;
//             position: relative;
//           ">
//             <!-- Decorative overlay -->
//             <div style="
//               background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15) 0%, transparent 50%);
//               padding: 48px 40px;
//               text-align: center;
//             ">
//               <img src="cid:app_logo" alt="Micrologic Logo" style="
//                 width: 280px;
//                 max-width: 85%;
//                 height: auto;
//                 margin-bottom: 16px;
//                 filter: 
//                   drop-shadow(0 8px 20px rgba(0,0,0,0.25))
//                   brightness(1.05);
//                 border-radius: 8px;
//               "/>
              
//               <div style="
//                 color: rgba(255,255,255,0.95);
//                 font-size: 15px;
//                 font-weight: 500;
//                 letter-spacing: 0.5px;
//                 margin-top: 8px;
//               ">
//                 Project Management Dashboard
//               </div>
//             </div>
//           </td>
//         </tr>

//         <!-- Main Content -->
//         <tr>
//           <td style="padding: 48px 40px;">

//             <!-- Welcome Message -->
//             <div style="margin-bottom: 32px;">
//               <h1 style="
//                 margin: 0 0 12px;
//                 font-size: 28px;
//                 font-weight: 700;
//                 color: #111827;
//                 letter-spacing: -0.5px;
//               ">
//                 Welcome, ${name}! 👋
//               </h1>

//               <p style="
//                 margin: 0;
//                 color: #6b7280;
//                 font-size: 16px;
//                 line-height: 1.6;
//               ">
//                 ${greeting}, your account has been successfully created. Get started by logging in with your credentials below.
//               </p>
//             </div>

//             <!-- Credentials Card -->
//             <div style="
//               background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%);
//               border: 2px solid #c7d2fe;
//               border-radius: 16px;
//               padding: 28px;
//               margin-bottom: 32px;
//               position: relative;
//               overflow: hidden;
//             ">
//               <!-- Decorative corner accent -->
//               <div style="
//                 position: absolute;
//                 top: -20px;
//                 right: -20px;
//                 width: 80px;
//                 height: 80px;
//                 background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
//                 border-radius: 50%;
//               "></div>

//               <h3 style="
//                 margin: 0 0 20px;
//                 color: #1e293b;
//                 font-size: 18px;
//                 font-weight: 700;
//                 display: flex;
//                 align-items: center;
//               ">
//                 <span style="
//                   display: inline-block;
//                   width: 6px;
//                   height: 6px;
//                   background: #4f46e5;
//                   border-radius: 50%;
//                   margin-right: 10px;
//                   box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
//                 "></span>
//                 Your Login Credentials
//               </h3>

//               <!-- Email -->
//               <div style="margin-bottom: 20px;">
//                 <label style="
//                   display: block;
//                   font-size: 12px;
//                   font-weight: 600;
//                   color: #6366f1;
//                   text-transform: uppercase;
//                   letter-spacing: 0.5px;
//                   margin-bottom: 8px;
//                 ">
//                   📧 Email Address
//                 </label>
//                 <div style="
//                   background: #ffffff;
//                   border: 2px solid #e0e7ff;
//                   border-radius: 10px;
//                   padding: 14px 16px;
//                   font-size: 15px;
//                   color: #1e293b;
//                   font-weight: 500;
//                   box-shadow: 0 2px 4px rgba(79, 70, 229, 0.05);
//                 ">
//                   ${toEmail}
//                 </div>
//               </div>

//               <!-- Password -->
//               <div>
//                 <label style="
//                   display: block;
//                   font-size: 12px;
//                   font-weight: 600;
//                   color: #6366f1;
//                   text-transform: uppercase;
//                   letter-spacing: 0.5px;
//                   margin-bottom: 8px;
//                 ">
//                   🔐 Temporary Password
//                 </label>
//                 <div style="
//                   background: #ffffff;
//                   border: 2px dashed #818cf8;
//                   border-radius: 10px;
//                   padding: 16px;
//                   text-align: center;
//                   box-shadow: 
//                     0 4px 12px rgba(79, 70, 229, 0.1),
//                     inset 0 2px 4px rgba(99, 102, 241, 0.05);
//                 ">
//                   <code style="
//                     color: #4f46e5;
//                     font-size: 20px;
//                     font-weight: 700;
//                     letter-spacing: 1px;
//                     font-family: 'Courier New', Courier, monospace;
//                   ">
//                     ${tempPassword}
//                   </code>
//                 </div>
//               </div>

//               <!-- Security Notice -->
//               <div style="
//                 margin-top: 16px;
//                 padding: 12px;
//                 background: rgba(251, 191, 36, 0.1);
//                 border-left: 3px solid #f59e0b;
//                 border-radius: 6px;
//               ">
//                 <p style="
//                   margin: 0;
//                   font-size: 13px;
//                   color: #92400e;
//                   line-height: 1.5;
//                 ">
//                   <strong>⚠️ Security Note:</strong> Please change your password after your first login.
//                 </p>
//               </div>
//             </div>

//             <!-- CTA Button -->
//             <div style="text-align: center; margin: 36px 0;">
//               <a href="${process.env.FRONTEND_URL}" style="
//                 display: inline-block;
//                 padding: 16px 48px;
//                 background: linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #7c3aed 100%);
//                 color: #ffffff;
//                 text-decoration: none;
//                 border-radius: 12px;
//                 font-weight: 700;
//                 font-size: 16px;
//                 letter-spacing: 0.3px;
//                 box-shadow: 
//                   0 12px 28px rgba(79, 70, 229, 0.3),
//                   0 4px 8px rgba(79, 70, 229, 0.2);
//                 transition: all 0.3s ease;
//                 border: 2px solid rgba(255, 255, 255, 0.2);
//               ">
//                 Access Dashboard →
//               </a>
//             </div>

//             <!-- Help Section -->
//             <div style="
//               text-align: center;
//               padding-top: 24px;
//               border-top: 1px solid #e5e7eb;
//             ">
//               <p style="
//                 margin: 0;
//                 color: #9ca3af;
//                 font-size: 14px;
//                 line-height: 1.6;
//               ">
//                 Need assistance? Our support team is here to help.<br/>
//                 <a href="mailto:support@pmdashboard.com" style="
//                   color: #6366f1;
//                   font-weight: 600;
//                   text-decoration: none;
//                   border-bottom: 2px solid transparent;
//                 ">
//                   support@pmdashboard.com
//                 </a>
//               </p>
//             </div>

//           </td>
//         </tr>

//         <!-- Footer -->
//         <tr>
//           <td style="
//             padding: 32px 40px;
//             background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
//             text-align: center;
//             border-top: 1px solid #e5e7eb;
//           ">
            
//           <div style="margin-bottom: 16px;">
//             <a href="https://micrologicglobal.com" target="_blank" style="
//               display: inline-block;
//               padding: 8px 20px;
//               background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
//               border-radius: 20px;
//               color: #ffffff !important;
//               font-size: 13px;
//               font-weight: 700;
//               letter-spacing: 0.5px;
//               text-decoration: none;
//               box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
//             ">
//               Powered by Micrologic Integrated Systems
//             </a>
//           </div>


//                 <div style="
//                   color: #000000;
//                   font-size: 12px;
//                   line-height: 1.8;
//                   font-weight: 700;
//                 ">
//                   © ${new Date().getFullYear()} PM Dashboard. All rights reserved.<br/>
//                   <span style="
//                     color: #000000;
//                     font-weight: 700;
//                   ">
//                     This email contains sensitive information. Please keep it secure.
//                   </span>
//                 </div>


//             <!-- Social Links (Optional) -->
//             <div style="margin-top: 16px;">
//               <span style="
//                 display: inline-block;
//                 margin: 0 6px;
//                 width: 8px;
//                 height: 8px;
//                 background: #c7d2fe;
//                 border-radius: 50%;
//               "></span>
//               <span style="
//                 display: inline-block;
//                 margin: 0 6px;
//                 width: 8px;
//                 height: 8px;
//                 background: #c7d2fe;
//                 border-radius: 50%;
//               "></span>
//               <span style="
//                 display: inline-block;
//                 margin: 0 6px;
//                 width: 8px;
//                 height: 8px;
//                 background: #c7d2fe;
//                 border-radius: 50%;
//               "></span>
//             </div>

//           </td>
//         </tr>

//       </table>

//       <!-- Bottom Spacing -->
//       <div style="height: 40px;"></div>

//     </td>
//   </tr>
// </table>

// </body>
// </html>
// `;

//   console.log("📧 Sending email to:", toEmail);

//   return await transporter.sendMail({
//     from: process.env.EMAIL_FROM,
//     to: toEmail,
//     subject: "Your PM Dashboard Login Credentials 🔑",
//     html,
//     attachments: [
//       {
//         filename: "logo.png",
//         path: logoPath,
//         cid: "app_logo"   // MUST match HTML cid:app_logo
//       }
//     ]
//   });
// }

// /* ============================================================
//    NEW EMAIL: FILE UPLOADED (WITH CUSTOMER NAME)
// ============================================================ */
// export async function sendFileUploadedEmail({ 
//   toEmail, 
//   fileName, 
//   folderName, 
//   projectName,
//   companyName     // ⭐ added
// }) {

//   console.log("📨 Triggered sendFileUploadedEmail:", toEmail, fileName);

// const html = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
// <meta charset="UTF-8" />
// <meta name="viewport" content="width=device-width, initial-scale=1.0" />
// <title>Email Notification</title>

// <style>
//   body {
//     background: #ffffff;
//     margin: 0;
//     padding: 20px;
//     font-family: 'Segoe UI', Tahoma, sans-serif;
//   }
//   .container {
//     max-width: 650px;
//     margin: auto;
//     border-radius: 16px;
//     overflow: hidden;
//     box-shadow: 0 10px 35px rgba(0,0,0,0.1);
//     background: white;
//   }
//   .header {
//     text-align: center;
//     padding: 40px 20px;
//     background: linear-gradient(135deg,#6a5af9,#7f35cd);
//     color: white;
//   }
//   .header .customer {
//     font-size: 20px;
//     font-weight: 600;
//     opacity: 0.9;
//     margin-bottom: 10px;
//   }
//   .header h1 {
//     font-size: 26px;
//     margin-bottom: 5px;
//   }
//   .card {
//     background: #f8faff;
//     margin: 25px;
//     padding: 25px;
//     border-radius: 12px;
//     border-left: 4px solid #6a5af9;
//   }
//   .file-name {
//     font-size: 18px;
//     font-weight: 600;
//     color: #222;
//     margin-bottom: 16px;
//   }
//   .label {
//     color: #6b7280;
//     font-size: 12px;
//     text-transform: uppercase;
//   }
//   .value {
//     color: #1f2937;
//     font-size: 15px;
//     font-weight: 500;
//     margin-bottom: 12px;
//   }
//   .button {
//     display: inline-block;
//     padding: 12px 30px;
//     border-radius: 8px;
//     background: linear-gradient(135deg,#6a5af9,#7f35cd);
//     color: white !important;
//     font-weight: 600;
//     text-decoration: none;
//     margin: 20px auto;
//   }
//   .footer {
//     text-align: center;
//     padding: 20px;
//     font-size: 13px;
//     color: #6b7280;
//     background: #f9fafb;
//     border-top: 1px solid #e5e7eb;
//   }
// </style>

// </head>
// <body>

// <div class="container">

//   <div class="header">
//       <div class="customer">${companyName}</div>
//       <h1>📄 New File Uploaded</h1>
//       <p>A file has been successfully uploaded to your project</p>
//   </div>

//   <div class="card">
//       <div class="file-name">${fileName}</div>

//       <div class="label">Project</div>
//       <div class="value">${projectName}</div>

//       <div class="label">Folder</div>
//       <div class="value">${folderName}</div>
//   </div>

//   <div style="text-align:center;">
//     <a href="${process.env.FRONTEND_URL}" class="button">View File</a>
//   </div>

//   <div class="footer">
//       This is an automated notification. Please do not reply.<br>
//       © 2024 PM Dashboard. All rights reserved.
//   </div>

// </div>
// </body>
// </html>
// `;

//   return transporter.sendMail({
//     from: process.env.EMAIL_FROM,
//     to: toEmail,
//     subject: `📤 File Uploaded: ${fileName}`,
//     html,
//   });
// }

// /* ============================================================
//    NEW EMAIL: FILE DELETED (WITH CUSTOMER NAME)
// ============================================================ */
// export async function sendFileDeletedEmail({ 
//   toEmail, 
//   fileName, 
//   folderName, 
//   projectName,
//   companyName      // ⭐ added
// }) {

// console.log("🗑️ Triggered sendFileDeletedEmail:", toEmail, fileName);

// const html = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
// <meta charset="UTF-8" />
// <meta name="viewport" content="width=device-width, initial-scale=1.0" />
// <title>Email Notification</title>

// <style>
//   body {
//     background: #ffffff;
//     margin: 0;
//     padding: 20px;
//     font-family: 'Segoe UI', Tahoma, sans-serif;
//   }
//   .container {
//     max-width: 650px;
//     margin: auto;
//     border-radius: 16px;
//     overflow: hidden;
//     box-shadow: 0 10px 35px rgba(0,0,0,0.1);
//     background: white;
//   }
//   .header {
//     text-align: center;
//     padding: 40px 20px;
//     background: linear-gradient(135deg,#8e2de2,#4a00e0);
//     color: white;
//   }
//   .header .customer {
//     font-size: 20px;
//     font-weight: 600;
//     opacity: 0.9;
//     margin-bottom: 10px;
//   }
//   .header h1 {
//     font-size: 26px;
//     margin-bottom: 5px;
//   }
//   .card {
//     background: #faf5ff;
//     margin: 25px;
//     padding: 25px;
//     border-radius: 12px;
//     border-left: 4px solid #8e2de2;
//   }
//   .file-name {
//     font-size: 18px;
//     font-weight: 600;
//     color: #222;
//     margin-bottom: 16px;
//   }
//   .label {
//     color: #6b7280;
//     font-size: 12px;
//     text-transform: uppercase;
//   }
//   .value {
//     color: #1f2937;
//     font-size: 15px;
//     font-weight: 500;
//     margin-bottom: 12px;
//   }
//   .alert {
//     background: #f3e8ff;
//     border: 1px solid #d6bbfc;
//     padding: 16px;
//     border-radius: 8px;
//     margin: 25px;
//     color: #4a1d6b;
//     font-size: 14px;
//   }
//   .footer {
//     text-align: center;
//     padding: 20px;
//     font-size: 13px;
//     color: #6b7280;
//     background: #f9fafb;
//     border-top: 1px solid #e5e7eb;
//   }
// </style>

// </head>
// <body>

// <div class="container">

//   <div class="header">
//       <div class="customer">${companyName}</div>
//       <h1>🗑️ File Deleted</h1>
//       <p>A file has been removed from your project</p>
//   </div>

//   <div class="card">
//       <div class="file-name">${fileName}</div>

//       <div class="label">Project</div>
//       <div class="value">${projectName}</div>

//       <div class="label">Folder</div>
//       <div class="value">${folderName}</div>
//   </div>

//   <div class="alert">
//       ⚠️ This file has been permanently deleted and cannot be recovered.<br />
//       If this was not intended, please contact your administrator immediately.
//   </div>

//   <div class="footer">
//     This is an automated notification. Please do not reply.<br>
//     © 2024 PM Dashboard. All rights reserved.
//   </div>

// </div>

// </body>
// </html>
// `;

// return transporter.sendMail({
//   from: process.env.EMAIL_FROM,
//   to: toEmail,
//   subject: `❌ File Deleted: ${fileName}`,
//   html,
// });
// }





// backend/utils/mailService.js
import 'dotenv/config';
import axios from 'axios';
import qs from 'qs';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to logo in your repo (same as before)
const logoPath = path.resolve(__dirname, '../../frontend/public/Micrologic_new_logo.png');

// Token endpoint
const tokenEndpoint = `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`;

// Helper: get access token using refresh token (and persist rotated refresh_token)
async function getAccessToken() {
  const data = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: process.env.REFRESH_TOKEN,
    scope: 'offline_access Mail.Send openid profile'
  };

  try {
        const resp = await axios.post(tokenEndpoint, qs.stringify(data), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        // Persist rotated refresh token only in development (never in production)
        if (
          resp.data.refresh_token &&
          resp.data.refresh_token !== process.env.REFRESH_TOKEN
        ) {

          if (process.env.NODE_ENV !== 'production') {
            await persistRefreshToken(resp.data.refresh_token);
            console.log('New refresh_token persisted to .env');
          }

          process.env.REFRESH_TOKEN = resp.data.refresh_token;
        }

        return resp.data.access_token;

  } catch (err) {
    console.error('Failed to get access token:', err.response ? err.response.data : err.message);
    throw err;
  }
}

// Persist refresh token to .env (simple implementation for development)
async function persistRefreshToken(newToken) {
  const envPath = path.resolve(process.cwd(), '.env');
  try {
    let text = '';
    try { text = await fs.readFile(envPath, 'utf8'); } catch {}
    const regex = /^REFRESH_TOKEN=.*$/m;
    if (regex.test(text)) {
      text = text.replace(regex, `REFRESH_TOKEN=${newToken}`);
    } else {
      if (text.length && !text.endsWith('\n')) text += '\n';
      text += `REFRESH_TOKEN=${newToken}\n`;
    }
    await fs.writeFile(envPath, text, 'utf8');
  } catch (e) {
    console.warn('Unable to persist refresh token to .env:', e.message || e);
  }
}

// Helper: read file and return base64 string
async function fileToBase64(filePath) {
  const buffer = await fs.readFile(filePath);
  return buffer.toString('base64');
}

// Helper: send message payload to Graph
async function graphSendMail({ subject, htmlBody, toRecipients = [], attachments = [] }) {
  const token = await getAccessToken();
  const payload = {
    message: {
      subject,
      body: { contentType: 'HTML', content: htmlBody },
      toRecipients: toRecipients.map(addr => ({ emailAddress: { address: addr } })),
      attachments: attachments // attachments expected in Graph format
    },
    saveToSentItems: true
  };

  try {
    await axios.post('https://graph.microsoft.com/v1.0/me/sendMail', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    console.error('graphSendMail failed:', err.response ? err.response.data : err.message);
    throw err;
  }
}

/* ============================================================
   Utilities for building attachments (inline logo)
   Graph attachment format (fileAttachment):
   {
     "@odata.type": "#microsoft.graph.fileAttachment",
     "name": "logo.png",
     "contentType": "image/png",
     "contentBytes": "<base64>",
     "contentId": "app_logo",
     "isInline": true
   }
============================================================ */
async function buildInlineLogoAttachment() {
  try {
    const b64 = await fileToBase64(logoPath);
    return {
      '@odata.type': '#microsoft.graph.fileAttachment',
      name: 'logo.png',
      contentType: 'image/png',
      contentBytes: b64,
      contentId: 'app_logo',
      isInline: true
    };
  } catch (err) {
    console.warn('Logo not included (file missing):', logoPath);
    return null;
  }
}

/* ============================================================
   Email templates (your existing HTML bodies) - unchanged
   I kept them identical but removed nodemailer-specific cid usage
   for inline images we use contentId "app_logo" which matches cid:app_logo
============================================================ */

// small helper to get greeting
function getGreeting() {
  const indiaTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false });
  const hour = parseInt(indiaTime.split(':')[0], 10);
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

/* ============================================================
   sendCustomerCredentials
   - toEmail, name, tempPassword
============================================================ */
export async function sendCustomerCredentials({ toEmail, name, tempPassword }) {
  const greeting = getGreeting();
  const logoAttachment = await buildInlineLogoAttachment();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>PM Dashboard Credentials</title>
<!--[if mso]>
<style type="text/css">
  body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
</style>
<![endif]-->
</head>

<body style="
  margin: 0; 
  padding: 0; 
  background: linear-gradient(135deg, #e0e7ff 0%, #f3f4f6 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
">

<table role="presentation" width="100%" style="border-collapse: collapse; min-height: 100vh;">
  <tr>
    <td align="center" style="padding: 40px 20px;">

      <!-- Main Card -->
      <table role="presentation" width="600" style="
        background: #ffffff;
        border-radius: 20px;
        box-shadow: 
          0 20px 60px rgba(79, 70, 229, 0.15),
          0 8px 16px rgba(79, 70, 229, 0.08);
        overflow: hidden;
        border: 1px solid rgba(224, 231, 255, 0.8);
      ">

        <!-- Gradient Header with Logo -->
        <tr>
          <td style="
            background: linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #7c3aed 100%);
            padding: 0;
            position: relative;
          ">
            <!-- Decorative overlay -->
            <div style="
              background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15) 0%, transparent 50%);
              padding: 48px 40px;
              text-align: center;
            ">
              <img src="cid:app_logo" alt="Micrologic Logo" style="
                width: 280px;
                max-width: 85%;
                height: auto;
                margin-bottom: 16px;
                filter: 
                  drop-shadow(0 8px 20px rgba(0,0,0,0.25))
                  brightness(1.05);
                border-radius: 8px;
              "/>
              
              <div style="
                color: rgba(255,255,255,0.95);
                font-size: 15px;
                font-weight: 500;
                letter-spacing: 0.5px;
                margin-top: 8px;
              ">
                Project Management Dashboard
              </div>
            </div>
          </td>
        </tr>

        <!-- Main Content -->
        <tr>
          <td style="padding: 48px 40px;">

            <!-- Welcome Message -->
            <div style="margin-bottom: 32px;">
              <h1 style="
                margin: 0 0 12px;
                font-size: 28px;
                font-weight: 700;
                color: #111827;
                letter-spacing: -0.5px;
              ">
                Welcome, ${name}! 👋
              </h1>

              <p style="
                margin: 0;
                color: #6b7280;
                font-size: 16px;
                line-height: 1.6;
              ">
                ${greeting}, your account has been successfully created. Get started by logging in with your credentials below.
              </p>
            </div>

            <!-- Credentials Card -->
            <div style="
              background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%);
              border: 2px solid #c7d2fe;
              border-radius: 16px;
              padding: 28px;
              margin-bottom: 32px;
              position: relative;
              overflow: hidden;
            ">
              <!-- Decorative corner accent -->
              <div style="
                position: absolute;
                top: -20px;
                right: -20px;
                width: 80px;
                height: 80px;
                background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
                border-radius: 50%;
              "></div>

              <h3 style="
                margin: 0 0 20px;
                color: #1e293b;
                font-size: 18px;
                font-weight: 700;
                display: flex;
                align-items: center;
              ">
                <span style="
                  display: inline-block;
                  width: 6px;
                  height: 6px;
                  background: #4f46e5;
                  border-radius: 50%;
                  margin-right: 10px;
                  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
                "></span>
                Your Login Credentials
              </h3>

              <!-- Email -->
              <div style="margin-bottom: 20px;">
                <label style="
                  display: block;
                  font-size: 12px;
                  font-weight: 600;
                  color: #6366f1;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                  margin-bottom: 8px;
                ">
                  📧 Email Address
                </label>
                <div style="
                  background: #ffffff;
                  border: 2px solid #e0e7ff;
                  border-radius: 10px;
                  padding: 14px 16px;
                  font-size: 15px;
                  color: #1e293b;
                  font-weight: 500;
                  box-shadow: 0 2px 4px rgba(79, 70, 229, 0.05);
                ">
                  ${toEmail}
                </div>
              </div>

              <!-- Password -->
              <div>
                <label style="
                  display: block;
                  font-size: 12px;
                  font-weight: 600;
                  color: #6366f1;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                  margin-bottom: 8px;
                ">
                  🔐 Temporary Password
                </label>
                <div style="
                  background: #ffffff;
                  border: 2px dashed #818cf8;
                  border-radius: 10px;
                  padding: 16px;
                  text-align: center;
                  box-shadow: 
                    0 4px 12px rgba(79, 70, 229, 0.1),
                    inset 0 2px 4px rgba(99, 102, 241, 0.05);
                ">
                  <code style="
                    color: #4f46e5;
                    font-size: 20px;
                    font-weight: 700;
                    letter-spacing: 1px;
                    font-family: 'Courier New', Courier, monospace;
                  ">
                    ${tempPassword}
                  </code>
                </div>
              </div>

              <!-- Security Notice -->
              <div style="
                margin-top: 16px;
                padding: 12px;
                background: rgba(251, 191, 36, 0.1);
                border-left: 3px solid #f59e0b;
                border-radius: 6px;
              ">
                <p style="
                  margin: 0;
                  font-size: 13px;
                  color: #92400e;
                  line-height: 1.5;
                ">
                  <strong>⚠️ Security Note:</strong> Please change your password after your first login.
                </p>
              </div>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; margin: 36px 0;">
              <a href="${process.env.FRONTEND_URL}" style="
                display: inline-block;
                padding: 16px 48px;
                background: linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #7c3aed 100%);
                color: #ffffff;
                text-decoration: none;
                border-radius: 12px;
                font-weight: 700;
                font-size: 16px;
                letter-spacing: 0.3px;
                box-shadow: 
                  0 12px 28px rgba(79, 70, 229, 0.3),
                  0 4px 8px rgba(79, 70, 229, 0.2);
                transition: all 0.3s ease;
                border: 2px solid rgba(255, 255, 255, 0.2);
              ">
                Access Dashboard →
              </a>
            </div>

            <!-- Help Section -->
            <div style="
              text-align: center;
              padding-top: 24px;
              border-top: 1px solid #e5e7eb;
            ">
              <p style="
                margin: 0;
                color: #9ca3af;
                font-size: 14px;
                line-height: 1.6;
              ">
                Need assistance? Our support team is here to help.<br/>
                <a href="mailto:support@pmdashboard.com" style="
                  color: #6366f1;
                  font-weight: 600;
                  text-decoration: none;
                  border-bottom: 2px solid transparent;
                ">
                  support@pmdashboard.com
                </a>
              </p>
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="
            padding: 32px 40px;
            background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
            text-align: center;
            border-top: 1px solid #e5e7eb;
          ">
            
          <div style="margin-bottom: 16px;">
            <a href="https://micrologicglobal.com" target="_blank" style="
              display: inline-block;
              padding: 8px 20px;
              background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
              border-radius: 20px;
              color: #ffffff !important;
              font-size: 13px;
              font-weight: 700;
              letter-spacing: 0.5px;
              text-decoration: none;
              box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
            ">
              Powered by Micrologic Integrated Systems
            </a>
          </div>


                <div style="
                  color: #000000;
                  font-size: 12px;
                  line-height: 1.8;
                  font-weight: 700;
                ">
                  © ${new Date().getFullYear()} PM Dashboard. All rights reserved.<br/>
                  <span style="
                    color: #000000;
                    font-weight: 700;
                  ">
                    This email contains sensitive information. Please keep it secure.
                  </span>
                </div>


            <!-- Social Links (Optional) -->
            <div style="margin-top: 16px;">
              <span style="
                display: inline-block;
                margin: 0 6px;
                width: 8px;
                height: 8px;
                background: #c7d2fe;
                border-radius: 50%;
              "></span>
              <span style="
                display: inline-block;
                margin: 0 6px;
                width: 8px;
                height: 8px;
                background: #c7d2fe;
                border-radius: 50%;
              "></span>
              <span style="
                display: inline-block;
                margin: 0 6px;
                width: 8px;
                height: 8px;
                background: #c7d2fe;
                border-radius: 50%;
              "></span>
            </div>

          </td>
        </tr>

      </table>

      <!-- Bottom Spacing -->
      <div style="height: 40px;"></div>

    </td>
  </tr>
</table>

</body>
</html>
`;
 // paste your full large HTML template here exactly as before
  /* NOTE: keep the <img src="cid:app_logo" .../> in the HTML exactly as you had.
     Graph inline attachment uses contentId 'app_logo' which matches cid:app_logo. */

  // Build attachments array for Graph
  const attachments = [];
  if (logoAttachment) attachments.push(logoAttachment);

  await graphSendMail({
    subject: 'Your PM Dashboard Login Credentials 🔑',
    htmlBody: html,
    toRecipients: [toEmail],
    attachments
  });

  console.log('Sent credentials email to', toEmail);
}

/* ============================================================
   sendFileUploadedEmail
   - toEmail, fileName, folderName, projectName, companyName
============================================================ */
export async function sendFileUploadedEmail({ toEmail, fileName, folderName, projectName, companyName }) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Email Notification</title>

<style>
  body {
    background: #ffffff;
    margin: 0;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, sans-serif;
  }
  .container {
    max-width: 650px;
    margin: auto;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 35px rgba(0,0,0,0.1);
    background: white;
  }
  .header {
    text-align: center;
    padding: 40px 20px;
    background: linear-gradient(135deg,#6a5af9,#7f35cd);
    color: white;
  }
  .header .customer {
    font-size: 20px;
    font-weight: 600;
    opacity: 0.9;
    margin-bottom: 10px;
  }
  .header h1 {
    font-size: 26px;
    margin-bottom: 5px;
  }
  .card {
    background: #f8faff;
    margin: 25px;
    padding: 25px;
    border-radius: 12px;
    border-left: 4px solid #6a5af9;
  }
  .file-name {
    font-size: 18px;
    font-weight: 600;
    color: #222;
    margin-bottom: 16px;
  }
  .label {
    color: #6b7280;
    font-size: 12px;
    text-transform: uppercase;
  }
  .value {
    color: #1f2937;
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 12px;
  }
  .button {
    display: inline-block;
    padding: 12px 30px;
    border-radius: 8px;
    background: linear-gradient(135deg,#6a5af9,#7f35cd);
    color: white !important;
    font-weight: 600;
    text-decoration: none;
    margin: 20px auto;
  }
  .footer {
    text-align: center;
    padding: 20px;
    font-size: 13px;
    color: #6b7280;
    background: #f9fafb;
    border-top: 1px solid #e5e7eb;
  }
</style>

</head>
<body>

<div class="container">

  <div class="header">
      <div class="customer">${companyName}</div>
      <h1>📄 New File Uploaded</h1>
      <p>A file has been successfully uploaded to your project</p>
  </div>

  <div class="card">
      <div class="file-name">${fileName}</div>

      <div class="label">Project</div>
      <div class="value">${projectName}</div>

      <div class="label">Folder</div>
      <div class="value">${folderName}</div>
  </div>

  <div style="text-align:center;">
    <a href="${process.env.FRONTEND_URL}" class="button">View File</a>
  </div>

  <div class="footer">
      This is an automated notification. Please do not reply.<br>
      © 2024 PM Dashboard. All rights reserved.
  </div>

</div>
</body>
</html>
`;

  await graphSendMail({
    subject: `📤 File Uploaded: ${fileName}`,
    htmlBody: html,
    toRecipients: [toEmail],
    attachments: [] // no file attachment here (this is a notification). If you want the actual uploaded file attached, convert to base64 and include.
  });

  console.log('Sent file uploaded email to', toEmail);
}

/* ============================================================
   sendFileDeletedEmail
   - toEmail, fileName, folderName, projectName, companyName
============================================================ */
export async function sendFileDeletedEmail({ toEmail, fileName, folderName, projectName, companyName }) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Email Notification</title>

<style>
  body {
    background: #ffffff;
    margin: 0;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, sans-serif;
  }
  .container {
    max-width: 650px;
    margin: auto;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 35px rgba(0,0,0,0.1);
    background: white;
  }
  .header {
    text-align: center;
    padding: 40px 20px;
    background: linear-gradient(135deg,#8e2de2,#4a00e0);
    color: white;
  }
  .header .customer {
    font-size: 20px;
    font-weight: 600;
    opacity: 0.9;
    margin-bottom: 10px;
  }
  .header h1 {
    font-size: 26px;
    margin-bottom: 5px;
  }
  .card {
    background: #faf5ff;
    margin: 25px;
    padding: 25px;
    border-radius: 12px;
    border-left: 4px solid #8e2de2;
  }
  .file-name {
    font-size: 18px;
    font-weight: 600;
    color: #222;
    margin-bottom: 16px;
  }
  .label {
    color: #6b7280;
    font-size: 12px;
    text-transform: uppercase;
  }
  .value {
    color: #1f2937;
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 12px;
  }
  .alert {
    background: #f3e8ff;
    border: 1px solid #d6bbfc;
    padding: 16px;
    border-radius: 8px;
    margin: 25px;
    color: #4a1d6b;
    font-size: 14px;
  }
  .footer {
    text-align: center;
    padding: 20px;
    font-size: 13px;
    color: #6b7280;
    background: #f9fafb;
    border-top: 1px solid #e5e7eb;
  }
</style>

</head>
<body>

<div class="container">

  <div class="header">
      <div class="customer">${companyName}</div>
      <h1>🗑️ File Deleted</h1>
      <p>A file has been removed from your project</p>
  </div>

  <div class="card">
      <div class="file-name">${fileName}</div>

      <div class="label">Project</div>
      <div class="value">${projectName}</div>

      <div class="label">Folder</div>
      <div class="value">${folderName}</div>
  </div>

  <div class="alert">
      ⚠️ This file has been permanently deleted and cannot be recovered.<br />
      If this was not intended, please contact your administrator immediately.
  </div>

  <div class="footer">
    This is an automated notification. Please do not reply.<br>
    © 2024 PM Dashboard. All rights reserved.
  </div>

</div>

</body>
</html>
`;

  await graphSendMail({
    subject: `❌ File Deleted: ${fileName}`,
    htmlBody: html,
    toRecipients: [toEmail],
    attachments: []
  });

  console.log('Sent file deleted email to', toEmail);
}
