import {EmailDataInterface, SmsDataInterface} from "../services/sender";

/**
 * A set of functions called "actions" for `sender`
 */


export default {
  sendSMS: async (ctx, next) => {
    const body: SmsDataInterface = ctx.request.body
    try {
      const data = await strapi.service("api::sender.sender").sendSms(body);

      console.log('data', data)
      ctx.body = data
    } catch (err) {
      ctx.badRequest('Что то пошло не так', { moreDetails: err})
    }
  },

  sendEmail: async (ctx, next) => {
    try {
      const body: EmailDataInterface = ctx.request.body
      const data = await strapi.service("api::sender.sender").sendEmail(body);
      console.log('data', data)
      ctx.body = data
    } catch (err) {
      ctx.badRequest('Что то пошло не так', { moreDetails: err})
    }
  }

};
