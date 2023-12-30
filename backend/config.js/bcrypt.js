import bycrpt from "bcrypt"

export const comparePassword  =  async( password, hashedPassword ) => {
     try {
          const check = await bycrpt.compare(password, hashedPassword)
          return check
     } catch (error) {
        console.log(error)
     }
}