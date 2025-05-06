const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config();
const validatePw = require("./passwordUtils").validatePw;

const {
  getAccountEmail,
  getAccountById,
  createAccount,
  createOwnerGoogle,
  createOAuthToken,
} = require("../db/authQueries");

//passport configs for strategies

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      console.log(req.body);
      try {
        const account = await getAccountEmail(email);
        if (!account) {
          return done(null, false, { error: "Invalid Email or Password" });
        }
        const validPw = await validatePw(account.password, password);
        if (!validPw) {
          return done(null, false, { error: "Invalid Email or Password" });
        }
        return done(null, account);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
//! Sort out passport for Google Strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
//       passReqToCallback: true,
//     },
//     async (req, accessToken, refreshToken, profile, done) => {
//       try {
//         const googleEmail = profile.emails[0].value;
//         const googleName = profile.displayName;
//         const googleProfilePicture = profile.photos[0]?.value;
//         const googleId = profile.id;

//         const existingAccount = await getAccountEmail(googleEmail);

//         if (existingAccount) {
//           done(null, existingAccount);
//         } else {
//           const newAccountData = {
//             companyEmail: googleEmail,
//             // You might want to set a temporary companyName here
//             // or leave it null and prompt on the google_success page
//           };
//           const newAccount = await createAccount(newAccountData);
//           if (newAccount) {
//             const ownerData = {
//               name: googleName,
//               accountId: newAccount.id,
//               email: googleEmail,
//               pfp: googleProfilePicture,
//               googleId: googleId,
//             };
//             const newOwnerGoogle = await createOwnerGoogle(ownerData);

//             if (newOwnerGoogle) {
//               const OAuthTokenData = {
//                 provider: "google",
//                 accessToken: accessToken,
//                 refreshToken: refreshToken,
//                 accountId: newAccount.id,
//               };
//               const newOAuthToken = await createOAuthToken(OAuthTokenData);

//               if (newOAuthToken) {
//                 return done(null, newAccount);
//               } else {
//                 console.error("Error creating OAuthToken");
//                 return done(new Error("Error creating OAuthToken"), null);
//               }
//             } else {
//               console.error("Error creating Owner Staff");
//               return done(new Error("Error creating Owner Staff"), null);
//             }
//           } else {
//             console.error("Error creating Account");
//             return done(new Error("Error creating Account"), null);
//           }
//         }
//       } catch (error) {
//         console.error(`Error in Google Strategy ${error}`);
//         return done(error, null);
//       }
//     }
//   )
// );

// serialize and deserialize user
passport.serializeUser((account, done) => {
  if (!account || !account.id) {
    return done(new Error("Invalid account object during serialization"));
  }
  done(null, account.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    if (!id) {
      return done(new Error("No account id provided in deserialization"));
    }
    const account = await getAccountById(id);
    if (!account) {
      return done(new Error("Account was not found during deserialization"));
    }
    done(null, account);
  } catch (err) {
    done(err);
  }
});
