const Xendit = require('xendit-node');
require('dotenv').config();

const xendit = new Xendit({
  secretKey: process.env.XENDIT_SECRET_KEY,
});

const { Invoice } = xendit;
const invoice = new Invoice(xendit);

const createInvoince = async (amount, payerEmail, userId) => {
  try {
    const createdInvoice = await invoice.createInvoice({
      externalID: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getUTCFullYear()}-${new Date().getTime()}-${userId}`,
      amount,
      currency: 'IDR',
      payerEmail,
      // paymentMethods: 'BNI_VA',
    });
    return {
      status: 'success',
      message: 'Invoice created.',
      data: createdInvoice,
    };
  } catch (error) {
    return {
      status: 'failed',
      statusCode: error.status,
      message: error.message,
    };
  }
};

const getPaymentDetails = async (id) => {
  try {
    const details = await invoice.getInvoice({
      invoiceID: id,
    });
    return {
      status: 'success',
      data: details,
    };
  } catch (error) {
    return {
      status: 'failed',
      statusCode: error.status,
      message: error.message,
    };
  }
};

module.exports = { createInvoince, getPaymentDetails };
