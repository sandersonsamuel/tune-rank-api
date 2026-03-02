import { env } from "../../../../configs/env";
import { IMailProvider } from "../../../providers/mail.provider";
import { Resend } from "resend";

export default class ResendProvider implements IMailProvider {

    private resend: Resend;

    constructor() {
        this.resend = new Resend(env.RESEND_API_KEY);
    }

    async sendEmail(to: string, subject: string, body: string): Promise<void> {
        await this.resend.emails.send({
            from: env.MAIL_FROM,
            to: [to],
            subject: subject,
            html: body,
        });
    }
}