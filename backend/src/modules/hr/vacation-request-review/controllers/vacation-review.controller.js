import prisma from '../../../../config/db.js';

export async function reviewVacationRequest(req, res){
    try{
        const { status, requestId, employeeId, requestedDays } = req.body;

        await prisma.vacationRequest.update({
            where: {
                id: requestId
            },
            data: {
                status
            }
        });

        // Update user's vacation days left
        // We deposited the user vacation days on submision, so if req is rejected give back the deposited days
        if(status === 'rejected'){
            await prisma.employe.update({
                where: {
                    id: employeeId
                },
                data: {
                    vacationDays: {
                        increment: requestedDays
                    }
                }
            })
        }

        return res.status(200).json({ message: "Request updated"})
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ message: "Internal server error"})
    }
}