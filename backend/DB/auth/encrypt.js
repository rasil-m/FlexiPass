const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

  const setPassword=()=>{
    let a
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        console.log(hash)
    });

}

 module.exports={setPassword}