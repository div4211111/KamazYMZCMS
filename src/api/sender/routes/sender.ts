export default {
  routes: [
    {
     method: 'POST',
     path: '/sender/sms',
     handler: 'sender.sendSMS',
     config: {
       policies: [],
       middlewares: [],
     },
    },
    {
      method: 'POST',
      path: '/sender/email',
      handler: 'sender.sendEmail',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
