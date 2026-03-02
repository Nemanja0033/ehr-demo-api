import prisma from '../../../../config/db.js';
import { io } from '../../../../server.js';

export async function getVacationRequests(req, res) {
    try {
        const companyId = req.companyId;

        if (!companyId) {
            return res.status(400).json({ message: "Company id is required" });
        }

        const vacationRequests = await prisma.vacationRequest.findMany({
            where: {
                // Nested where caluse to relation
                employe: {
                    companyId: companyId
                }
            },
            include: {
                employe: true
            }
        });


        if (!vacationRequests) {
            return res.status(404).json({ message: "Company not found" });
        };

        return res.status(200).json(vacationRequests)

    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function reviewVacationRequest(req, res) {
    try {
        const { status, requestId, requestedDays } = req.body;

        const vacationRequest = await prisma.vacationRequest.update({
            where: {
                id: requestId
            },
            data: {
                status
            }
        });

        // Workaround
        const employee = await prisma.vacationRequest.findUnique({
            where: {
                id: requestId
            },
            include: {
                employe: true
            }
        })

        // Update user's vacation days left
        // We deposited the user vacation days on submision, so if req is rejected give back the deposited days
        if (status === 'rejected') {
            await prisma.employe.update({
                where: {
                    id: employee.employe.id
                },
                data: {
                    vacationDays: {
                        increment: requestedDays
                    }
                }
            });
        };

        io.to(`user-${employee.employe.email}`).emit("notification:new", {
            type: "VACATION_REQUEST_STATUS",
            body: {
                id: vacationRequest.id,
                author: "HR",
                subject: `HR has ${status} your vacation request.`,
                timestamp: new Date()
            }
        })

        return res.status(200).json({ message: "Request updated" })
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" })
    }
}