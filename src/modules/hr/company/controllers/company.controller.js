import prisma from '../../../../config/db.js';

export async function createCompany(req, res){
    try{
        const { name } = req.body;
        const userId = req.user.userId;

        if(!name || !userId){
            return res.status(400).json({ message: "All fields are required"});
        }

        const company = await prisma.company.create({
            data: {
                name,
                hrId: userId
            }
        });

        res.status(201).json({ company });

    }
    catch(err){
        console.error(err);
        return res.status(500).json({ message: "Internal server error"});
    }
}

export async function getCompany(req, res){
    try{
        const userId = req.user.userId;

        if(!userId){
            res.status(400).json({ message: "HR id are required"});
        }

        const company = await prisma.company.findUnique({
            where: {
                hrId: userId
            }
        })

        res.status(200).json(company);

    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal server error"});
    }
}