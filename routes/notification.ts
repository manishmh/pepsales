import { Router, Response, Request } from "express";
import { db } from "../lib/db";
import { GenerateMail } from "../services/email";
import { SendSms } from "../services/sms";

const NotificationRouter = Router();

NotificationRouter.get('/users/:id/notifications', async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ success: false, message: "User ID is required." });
        return
    }

    try {
        const notifications = await db.notifications.findMany({ where: { userId: id } });
        res.status(200).json({ success: true, message: "Notifications fetched", notifications });
        return;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
        return
    }
});

NotificationRouter.post('/notifications', async (req: Request, res: Response) => {
    try {
        const { userId, type, subject, message, recipient } = req.body;

        if (!userId || !type || !message) {
            res.status(422).json({ success: false, message: "User ID, type, and message are required." });
            return;
        }

        const allowedTypes = ['email', 'sms', 'inApp'];
        if (!allowedTypes.includes(type)) {
            res.status(400).json({ success: false, message: "Invalid notification type." });
            return;
        }

        let success = false;
        let attempts = 0;
        const maxRetries = 3;

        const sendNotification = async (): Promise<boolean> => {
            switch (type) {
                case 'email':
                    return await GenerateMail(recipient, subject, message);
                case 'sms':
                    return await SendSms(recipient, subject, message);
                case 'inApp':
                    return true;
                default:
                    return false;
            }
        };

        while (!success && attempts < maxRetries) {
            attempts++;
            success = await sendNotification();
            if (!success) {
                console.warn(`Notification attempt ${attempts} failed.`);
            }
        }

        if (success) {
            // if success save the notification to the database for later to fetch. it. 
            const notification = await db.notifications.create({
                data: { userId, type, subject, message, recipient }
            });

            res.status(201).json({ success: true, message: "Notification sent", notification });
            return;
        }

        res.status(400).json({ success: false, message: "Notification sending failed after retries." });
        return;

    } catch (error) {
        console.error("Notification error:", error);
        res.status(500).json({ success: false, message: "Something went wrong! Try again." });
        return;
    }
});

export default NotificationRouter;