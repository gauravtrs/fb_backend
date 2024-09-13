const jwt =require('jsonwebtoken');
const dotenv =require('dotenv');

dotenv.config();



exports.authUser = async (req, res, next) => {
    try {
        const temp = req.header('Authorization');

         const token = temp ? temp.slice(7, temp.length) : ""; 

        // const authtoken = req.body.token;
        // const {token} = req.body;

        if (!token) {
            return res.status(400).json({ message: "Invalid Authentication" });
        }

        let tokenVerify = jwt.verify(token, process.env.SECRET_TOKEN);

        if (!tokenVerify) {
            return res.status(400).json({ message: "Invalid Authentication" });
        }

        req.user = tokenVerify; 

        next();

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
