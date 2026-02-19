import prisma from '../../../../config/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function registerEmploye(req, res) {
    try {
        const { email, name, surname, password, role } = req.body;
        const companyId = req.companyId;

        if (!email || !name || !surname || !password || !role || !companyId) {
            res.status(400).json({ message: "All fields are required" });
        }

        const existingEmploye = await prisma.employe.findUnique({ where: { email } });

        if (existingEmploye) {
            res.status(400).json({ message: "Employe already exist" });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const employe = await prisma.employe.create({
            data: {
                email,
                name,
                surname,
                password: hashedPassword,
                role,
                companyId
            }
        });

        res.status(201).json({ email, name, surname, password, role, companyId });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error"});
    }
}

export async function loginEmploye(req, res) {
    try {
        const { email, password } = req.body;

        const employe = await prisma.employe.findUnique({
            where: { email }
        });

        if (!employe) {
            res.status(404).json({ message: "Employe not registered" });
        }

        const isValidCredentials = await bcrypt.compare(password, employe.password);

        if (!isValidCredentials) {
            res.status(400).json({ message: "Invalid credentials " });
        }

        const token = jwt.sign(
            {
                userId: employe.id,
                role: "EMPLOYE"
            },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, email, name: employe.name })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}


// Handler for single employee for Employee alone.
export const getMeEmploye = async (req, res) => {
    const user = await prisma.employe.findUnique({
        where: { id: req.user.userId },
        select: {
            name: true,
            surname: true,
            sickLeave: true,
            vacationDays: true,
            email: true,
            role
        }
    })

    res.json(user);
}
