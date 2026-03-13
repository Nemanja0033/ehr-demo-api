import prisma from '../../../../config/db.js';

export async function getSickLeaveReports(req, res) {
    try {
        const companyId = req.companyId;

        if (!companyId) {
            return res.status(400).json({ message: "Company id is required" });
        }

        const sickLeaveReports = await prisma.sickLeaveRequest.findMany({
            where: {
                employe: {
                    companyId: companyId
                }
            },
            include: {
                employe: true
            }
        });


        if (!sickLeaveReports) {
            return res.status(404).json({ message: "Company not found" });
        };

        return res.status(200).json(sickLeaveReports)
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}