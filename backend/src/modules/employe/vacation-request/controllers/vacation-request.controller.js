import prisma from '../../../../config/db.js';

export async function submitVacationRequest(req, res){
    try{
        const { startDate, endDate } = req.body;
        const { userId } = req.user;

        if(!startDate || !endDate){
            return res.status(400).json({ message: "Vacation date interval required" });
        }

        const diffInMs = new Date(endDate).getTime() - new Date(startDate).getTime();
        const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInDays <= 0) {
            return res.status(400).json({ message: "End date must be after start date" });
        }

        const _vacationRequest = await prisma.vacationRequest.create({
            data: {
                employeId: userId,
                startDate,
                endDate
            }
        });

        // deposit vacation days, if hr approve the req the days will be decremented, if not then back to normal.
        const _depositVacationDays = await prisma.employe.update({
            where: {
                id: userId
            },
            data: {
                vacationDays: {
                    decrement: diffInDays
                }
            }
        })

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