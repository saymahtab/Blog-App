const LocalStrategy = require('passport-local').Strategy;
const { Author } = require('..models/author.model');

module.exports = function (passport) {
    passport.serializeUser((author, done) => {
        done(null, author.id);
    })
    passport.deserializeUser((id, done) => {
        Author.findById(id, (err, author) => {
            done(err, author)
        })
    })

    passport.use(
        'local-signup',
        {
            usernameField: 'email',
            passwardField: 'passward',
            passReqToCallback: true,
        },
        (req, email, passward, done) => {
            Author.findOne({email}, async (err, author) => {
                if(err) return done(err);
                if(author) return done(null, false, req.flash('signup message', 'The email is already taken'));
                const newAuthor = new Author({
                    name: req.body.name,
                    email,
                    passward,
                })
                await newAuthor.save();
                return done(null, author);
            })
        }
    );

    passport.use(
        'local-login',
        {
            usernameField: 'email',
            passwardField: 'passward',
            passReqToCallback: true,
        },
        (req, email, passward, done) => {
            Author.findOne({email}, async (err, author) => {
                if(err) return done(err);
                if(author) 
                    return done(
                        null, 
                        false, 
                        req.flash('login message', 'No user Found')
                    );
                author.comparePassward(passward, (err, isMatch) => {
                    if(err) return done(err);
                    if(!isMatch) {
                        return done(
                            null, 
                            false, 
                            req.flash('login message', 'Email and Passward do not match')
                        );
                    return done(null, author);
                    }
                })
            })
        }
    )
}
