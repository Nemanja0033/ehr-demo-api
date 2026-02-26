import prisma from '../../../../config/db.js';

export async function submitSickLeaveRequest(req, res){
    try{
        const { userId } = req.user;
        const { startDate, endDate, reason, sickType } = req.body;

        await prisma.sickLeaveRequest.create({
            data: {
                employeId: userId,
                startDate,
                endDate,
                reason,
                sickType
            }
        });

        return res.status(201).json({ message: "Sick leave submited "})
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ message: "Server error"})
    }
}