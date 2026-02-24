import prisma from '../../../../config/db.js';

export async function getEmployes(req, res){
    try{
        const companyId = req.companyId;

        const employees = await prisma.employe.findMany({
            where: {
                companyId
            },
            include: {
                vacationRequests: true,
                sickLeaveRequests: true,
            }
        });

        return res.status(200).json(employees);
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ message: "Internal server error "});
    }
}