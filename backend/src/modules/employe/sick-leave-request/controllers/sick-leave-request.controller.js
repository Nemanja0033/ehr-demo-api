import prisma from '../../../../config/db.js';

export async function submitSickLeaveRequest(req, res){
    try{
        const { userId } = req.user;
        const { startDate, endDate, reason } = req.body;

        await prisma.sickLeaveRequest.create({
            data: {
                employeId: userId,
                startDate,
                endDate,
                reason,
            }
        });

        await prisma.employe.update({
            where: { id: userId },
            data: {
                sickLeaveDays: {
                    decrement: 5
                }
            }
        })

        return res.status(201).json({ message: "Sick leave submited "})
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ message: "Server error"})
    }
}

export async function getSubmitedSickLeaveRequest(req, res){
    try{
        const { userId } = req.user;

        const sickLeaveRequests = await prisma.sickLeaveRequest.findMany({
            where: {
                employeId: userId
            }
        });

        return res.status(200).json(sickLeaveRequests)
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ message: "Internal server error"});
    }
}