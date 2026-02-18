import prisma from '../../../config/db.js';

export async function createCompany(req, res){
    try{
        const { name } = req.body;
        const { hrId } = req.hrId;

        if(!name || !hrId){
            res.status(400).json({ message: "All fields are required"});
        }

        const company = await prisma.company.create({
            data: {
                name,
                hrId
            }
        });

        res.status(201).json({ message: "Company succesfully created"});

    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal server error"});
    }
}

export async function getCompany(req, res){
    try{
        const { hrId } = req.hrId;

        if(!hrId){
            res.status(400).json({ message: "HR id are required"});
        }

        const company = await prisma.company.findUnique({
            where: {
                hrId
            }
        })

        res.status(200).json({ company });

    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal server error"});
    }
}