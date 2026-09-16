import express from 'express';
import { filterOnDateGetDockument, getUserSentDockumentDate } from '../config/statisticsControler.js'
import { lstat } from 'fs';

const router = express.Router();

function filterdData (data) {
if(!Array.isArray(data)) return [];

return data.reduce((acc, item) => {
            const cleanEmail = Array.isArray(item.userEmail) ? item.userEmail[0] : item.userEmail;

            let user = acc.find(u => u.userEmail === cleanEmail);

            if(!user) {
                user = {
                    userEmail: cleanEmail,
                    firstName: item.firstName,
                    lastName: item.lastName,
                    dockument: [],
                    totalValue: 0
                };

                acc.push(user);
            }

            user.dockument.push({
                dockumentID: item.dockumentID,
                dateSent: item.dateSent,
            });

            const value = Number(item.docValue) || 0;
            user.totalValue += value;

            return acc;
        }, []);
    }

router.get('/', async (req, res) => {
    try {
        const data = await getUserSentDockumentDate();

        const dataToSend = filterdData(data);

        res.status(200).json(dataToSend);
    } catch (error) {
        res.status(500).json({ message: 'Statistick kunde ine hämtas.' });
    }
});

router.post('/dates', async (req, res) => {
    const {startDate, endDate} = req.body;

    try {
        const data= await filterOnDateGetDockument(startDate, endDate);

        const dataToSend = await filterdData(data);

        res.status(200).json(dataToSend);
    } catch (error) {
        res.status(500).json({ message: 'Statistick kunde ine hämtas.' });
    }
})

export default router;