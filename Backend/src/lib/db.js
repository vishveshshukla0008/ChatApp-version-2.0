import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log(`Database Connected Successfully :`);
  } catch (error) {
    console.log("Database Connection Error :" + error);
  }
};
