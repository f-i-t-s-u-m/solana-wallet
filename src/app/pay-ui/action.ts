export const PayAction = () => {
  try {
    return {
      status: "success",
      message: "Payment Successful",
    };
  } catch (error) {
    return {
      status: "error",
      message: error,
    };
  }
};
