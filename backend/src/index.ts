import express, { Application, Request, Response } from "express";
import cors from "cors";
import cron from "node-cron";

const mongoose = require("mongoose");

import { getData, Deposit, Withdrawal } from "./api/subgraph";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.disable("x-powered-by");

app.get("/deposit", (req: Request, res: Response): any => {
  Deposit.aggregate([
    {
      $sort: {
        depositTime: -1,
      },
    },
    {
      $addFields: {
        week: { $week: "$depositTime" },
        year: { $year: "$depositTime" },
      },
    },
    {
      $group: {
        _id: { week: "$week", year: "$year" },
        data: { $push: "$$ROOT" },
      },
    },
  ]).then((result: any) => {
    return res.status(200).send({
      success: true,
      result,
    });
  });
});

app.get("/withdrawal", (req: Request, res: Response): any => {
  Withdrawal.aggregate([
    {
      $sort: {
        withdrawTime: -1,
      },
    },
    {
      $addFields: {
        week: { $week: "$withdrawTime" },
        year: { $year: "$withdrawTime" },
      },
    },
    {
      $group: {
        _id: { week: "$week", year: "$year" },
        data: { $push: "$$ROOT" },
      },
    },
  ]).then((result: any) => {
    return res.status(200).send({
      success: true,
      result,
    });
  });
});

// app.get("/realtime", (req: Request, res: Response): any => {
//   const twoDaysAgo = new Date();
//   twoDaysAgo.setHours(twoDaysAgo.getHours() - 48);
//   Deposit.aggregate([
//     {
//       $unionWith: {
//         coll: "withdrawals",
//         pipeline: [
//           {
//             $project: {
//               depositTime: "$withdrawalTime",
//               amount: 1,
//               from: 1,
//             },
//           },
//         ],
//       },
//     },
//     {
//       $project: {
//         time: "$depositTime",
//         amount: 1,
//         from: 1,
//         total: 1,
//       },
//     },
//     {
//       $group: {
//         _id: "$amount",
//         data: { $push: "$$ROOT" },
//         totalAmount: { $sum: "$amount" },
//       },
//     },
//   ]).then((result: any) => {
//     return res.status(200).send({
//       success: true,
//       result,
//     });
//   });
// });

app.post("/latestDeposit", (req: Request, res: Response): any => {
  Deposit.find()
    .sort({ depositTime: 1 })
    .findOne()
    .then((doc: any) => {
      if (doc == null) return res.status(200).send({ success: false });
      else
        return res.status(200).send({
          success: true,
          doc,
        });
    });
});

app.post("/latestWithdrawal", (req: Request, res: Response): any => {
  Withdrawal.find()
    .sort({ withdrawalTime: 1 })
    .findOne()
    .then((doc: any) => {
      if (doc == null) return res.status(200).send({ success: false });
      else {
        return res.status(200).send({
          success: true,
          doc,
        });
      }
    });
});

const PORT = 3000;

try {
  app.listen(PORT, (): void => {
    console.log(`Connected successfully on port ${PORT}`);
    cron.schedule(`0 0 * * *`, () => {
      getData();
    });
  });
} catch (error: any) {
  console.error(`Error ocurred: ${error.message}`);
}
