import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);

        req.userId = decoded.userId
        req.name = decoded.name
        req.jenis_pengguna = decoded.jenis_pengguna
        req.email = decoded.email
        req.no_telp = decoded.no_telp;

        next()
    })
}