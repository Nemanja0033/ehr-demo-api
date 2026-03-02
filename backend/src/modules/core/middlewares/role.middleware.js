import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const roleMiddleware = (reuiredRole) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const role = decoded.role;

            if (role === reuiredRole) {
                next();
            } else {
                return res.status(401).json({ message: "Unauthorized" });
            }
        }
        catch (err) {
            return res.status(401).json({ message: 'Invalid token' })
        }
    }

}