import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded;
    console.log("USER FROM AUTH MIDDLEWARE 1.", req.user);
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
