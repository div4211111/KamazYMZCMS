/**
 * sender service
 */

import twilio from 'twilio';
import Sib from 'sib-api-v3-sdk'
import {genHtml} from "../utils/genHtml";

export interface SmsDataInterface {
  name: string;
  phone: string;
  comment: string;
  productName: string;
}

export interface EmailDataInterface {
  name: string;
  phone: string;
  comment: string;
  email?: string;
  productName?: string;
}






export default () => ({
  sendSms: async function({name, phone, comment, productName}: SmsDataInterface) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioNumber =process.env.TWILIO_NUMBER;
    const myNumber = process.env.MY_NUMBER;
    const client = twilio(accountSid, authToken);
    try {
      await client.messages.create({
        body: `${name} интересуется товаром ${productName}. Оставил комментарий: ${comment}. Номер телефона: ${phone}`,
        to: myNumber,
        from: twilioNumber,
      })
      return {message: 'Сообщение успешно отправлено'}
    } catch (e) {
      return e
    }
  },

  sendEmail: async function({name, phone, comment, email, productName}: EmailDataInterface) {

    try {
      const client = Sib.ApiClient.instance
      const apiKey = client.authentications['api-key']
      apiKey.apiKey = process.env.API_KEY_EMAIL
      const tranEmailApi = new Sib.TransactionalEmailsApi()
      const sender = {
        email: email ? email : 'no-email@email.com',
        name: name,
      }
      const receivers = [
        {
          email: 'alexeevandre@gmail.com',
        },
      ]

      const response = await tranEmailApi
        .sendTransacEmail({
          sender,
          to: receivers,
          subject: 'Уведомление с сайта ymz.kz',
          htmlContent: genHtml(comment, phone, productName),
          params: {
            role: 'Frontend',
          },
        })
      return response
    } catch (e) {
      return e
    }
  }
});
