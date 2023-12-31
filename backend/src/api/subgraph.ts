import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const mongoose = require("mongoose");

const depositSchema = new mongoose.Schema({
  from: String,
  amount: Number,
  compound: Number,
  depositTime: Date,
});

const withdrawSchema = new mongoose.Schema({
  from: String,
  amount: Number,
  rewardAmount: Number,
  withdrawTime: Date,
});

// Connect to the MongoDB database using Mongoose
mongoose.connect("mongodb://localhost:27017/TokenPool", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const API_URL =
  "https://api.thegraph.com/subgraphs/name/davidazovsky/tokenpool_sepolia";

const query = `
  query {
    deposits (where: { depositTime_gte: ${
      Math.floor(Date.now() / 1000) - 86400
    } }){
      from
      amount
      compound
      depositTime
    }
    withdrawals (where: { withdrawTime_gte: ${
      Math.floor(Date.now() / 1000) - 86400
    } }){
      from
      amount
      rewardAmount
      withdrawTime
    }
  }
`;

const apolloClient = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

export const Deposit = mongoose.model("Deposit", depositSchema);
export const Withdrawal = mongoose.model("Withdrawal", withdrawSchema);

export const getData = () => {
  apolloClient
    .query({
      query: gql(query),
    })
    .then((data) => {
      const subgraphData = data.data;
      const depositData = subgraphData.deposits;
      const withdrawData = subgraphData.withdrawals;

      depositData.forEach((deposit: any) => {
        const _deposit = deposit;
        const _depositTime = parseInt(_deposit.depositTime);
        const _depositDate = new Date(_depositTime * 1000);

        const _depositSchema = new Deposit(deposit);
        _depositSchema.depositTime = _depositDate;
        _depositSchema.save();
      });

      withdrawData.forEach((withdrawal: any) => {
        const _withdraw = withdrawal;
        const _withdrawTime = parseInt(_withdraw.withdrawTime);
        const _withdrawDate = new Date(_withdrawTime * 1000);
        const _withdrawSchema = new Withdrawal(withdrawal);
        _withdrawSchema.withdrawTime = _withdrawDate;
        _withdrawSchema.save();
      });
    })
    .catch((err) => {
      console.log("Error fetching data:", err);
    });
};

export default apolloClient;
