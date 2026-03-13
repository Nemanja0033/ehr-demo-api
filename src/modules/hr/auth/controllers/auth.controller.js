
import prisma from '../../../../config/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export async function registerHr(req, res) {
    try {
        const { email, password, name } = req.body;

        const existingHr = await prisma.hr.findUnique({
            where: { email }
        });

        if (existingHr) {
            return res.status(400).json({ message: "Hr already exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const hr = await prisma.hr.create({
            data: {
                email,
                password: hashedPassword,
                name,
            }
        });

        res.status(200).json({ email, name });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export async function loginHr(req, res) {
    try {
        const { email, password } = req.body;

        const hr = await prisma.hr.findUnique({
            where: { email }
        });

        if (!hr) {
            res.status(404).json({ message: "Hr not registered" });
        }

        const isValidCredentials = await bcrypt.compare(password, hr.password);

        if (!isValidCredentials) {
            res.status(400).json({ message: "Invalid credentials " });
        }

        const token = jwt.sign(
            {
                userId: hr.id,
                role: 'HR'
            },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, email, name: hr.name })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getMeHr = async (req, res) => {
    const user = await prisma.hr.findUnique({
        where: { id: req.user.userId },
        select: {
            name: true,
            email: true
        }
    })

    res.json(user);
}
