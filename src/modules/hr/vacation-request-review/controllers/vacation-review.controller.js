import prisma from '../../../../config/db.js';
import { io } from '../../../../server.js';

export async function getVacationRequests(req, res) {
    try {
        const companyId = req.companyId;
        const { limit, page } = req.query;

        if (!companyId) {
            return res.status(400).json({ message: "Company id is required" });
        }

        const pageNumber = Number(page) || 1;
        const limitNumber = Number(limit) || 10;

        if (pageNumber < 1 || limitNumber < 1) {
            return res.status(400).json({ message: "Invalid pagination parameters" });
        }

        const vacationRequestCount = await prisma.vacationRequest.count({
            where: {
                employe: {
                    companyId: companyId
                }
            },
        });

        const allPages = Math.ceil(vacationRequestCount / limitNumber);

        const pages = [];

        for(let i = 0; i < allPages; i++){
            pages.push(i + 1);
        }

        const vacationRequests = await prisma.vacationRequest.findMany({
            skip: (pageNumber - 1) * limitNumber,
            take: limitNumber,
            where: {
                employe: {
                    companyId: companyId
                }
            },
            include: {
                employe: true
            }
        });

        if (vacationRequests.length === 0) {
            return res.status(404).json({ message: "No vacation requests found" });
        }

        return res.status(200).json({
            vacationRequests,
            pages
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function reviewVacationRequest(req, res) {
    try {
        const { status, id: requestId, requestedDays } = req.body;

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
        });

        // Ping client to trigger refetch
        // TODO: explore if there is other way to to this instead of web socket
        io.to(`user-${employee.employe.email}`).emit("vacationRequest:updated", vacationRequest);

        return res.status(200).json({ message: "Request updated" })
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" })
    }
}