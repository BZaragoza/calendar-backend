import jwt from 'jsonwebtoken';

export const generateJWT = (uid, name) => {
  
  return new Promise((resolve, reject) => {

    const payload = {
      uid,
      name
    }

    jwt.sign(payload, process.env.SECRET_JTW_SEED, {
      expiresIn: '2h'
    }, (err, token) => {
      
      if (err) {
        console.log(err)
        reject('Couldn\'t generate token')
      };

      resolve(token)

    })

  })

}