import prisma from '../../../../config/db.js';

export async function submitVacationRequest(req, res){
    try{
        const { startDate, endDate } = req.body;
        const { userId } = req.user;

        if(!startDate || !endDate){
            return res.status(400).json({ message: "Vacation date interval required" });
        }

        const _vacationRequest = await prisma.vacationRequest.create({
            data: {
                employeId: userId,
                startDate,
                endDate
            }
        });

        return res.status(201).json({ message: "Vacation request submited" });

    }
    catch(err){
        console.error(err);
        return res.status(500).json({ message: "Internal server error"});
    }
}

export async function getAllVacationRequests(req, res){
    try{
        const { userId } = req.user;

        const requests = await prisma.vacationRequest.findMany({
            where:{
                employeId: userId
            }
        });

        return res.status(200).json(requests);
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}