import prisma from '../../../../config/db.js';
import { io } from '../../../../server.js';

export async function submitSickLeaveRequest(req, res){
    try{
        const { userId } = req.user;
        const { startDate, endDate, reason } = req.body;

        const sickLeaveRequest = await prisma.sickLeaveRequest.create({
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
        });

        const user = await prisma.employe.findUnique({
            where: { id: userId }
        });

        // Workaround find our HR email to target their ws room
        const hr = await prisma.company.findUnique({
            where: { id: user.companyId },
            include: { hr: true }
        });


        // Emit real time notification
        io.to(`user-${hr.hr.email}`).emit("notification:new", {
            type: "SICK_LEAVE_REPORT",
            body: {
                id: sickLeaveRequest.id,
                author: user,
                subject: `${user.name} has submited sick leave.`,
                timestamp: new Date(),
            }
        });


        // Emit realtime data to the hr-sick-leave-report component
        io.to(`user-${hr.hr.email}`).emit("sickLeave:new", {
            id: sickLeaveRequest.id,
            employeId: userId,
            startDate,
            endDate,
            reason
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