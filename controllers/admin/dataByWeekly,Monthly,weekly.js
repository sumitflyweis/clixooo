const userSchema = require("../../models/User");
const heroSchema = require("../../models/hero");
const bookings = require("../../models/Bookings");

module.exports.getMonthwise = async (req, res) => {
  try {
    const d = req.params.d;
    console.log(d);

    if (d == "weekly") {
      const data1 = await userSchema.aggregate([
        {
          $match: {
            createdAt: { $gt: new Date(new Date() - 7 * 60 * 60 * 24 * 1000) },
          },
        },
      ]);
      console.log({ user: data1.length });

      const data5 = await heroSchema.aggregate([
        {
          $match: {
            createdAt: { $gt: new Date(new Date() - 7 * 60 * 60 * 24 * 1000) },
          },
        },
      ]);

      console.log({ hero: data5.length });

      const data9 = await bookings.aggregate([
        {
          $match: {
            createdAt: { $gt: new Date(new Date() - 7 * 60 * 60 * 24 * 1000) },
          },
        },
      ]);

      console.log({ booking: data9.length });

      let data4 = {
        user: data1.length,
        hero: data5.length,
        booking: data9.length,
      };
      console.log(data4);

      return res.status(200).send({data: data4 });
    }

    if (d == "monthly") {
      const data3 = await userSchema.aggregate([
        {
          $match: {
            createdAt: {
              $gt: new Date(new Date() - 4 * 7 * 60 * 60 * 24 * 1000),
            },
          },
        },
      ]);

      const data7 = await heroSchema.aggregate([
        {
          $match: {
            createdAt: {
              $gt: new Date(new Date() - 4 * 7 * 60 * 60 * 24 * 1000),
            },
          },
        },
      ]);

      const data11 = await bookings.aggregate([
        {
          $match: {
            createdAt: {
              $gt: new Date(new Date() - 4 * 7 * 60 * 60 * 24 * 1000),
            },
          },
        },
      ]);

      let data12 = {
        user: data3.length,
        hero: data7.length,
        booking: data11.length,
      };
      console.log(data12);
      return res.status(201).json({
        data: data12,
      });
    }

    if (d == "yearly") {
      const data2 = await userSchema.aggregate([
        {
          $match: {
            createdAt: {
              $gt: new Date(new Date() - 12 * 4 * 7 * 60 * 60 * 24 * 1000),
            },
          },
        },
      ]);

      const data6 = await heroSchema.aggregate([
        {
          $match: {
            createdAt: {
              $gt: new Date(new Date() - 12 * 4 * 7 * 60 * 60 * 24 * 1000),
            },
          },
        },
      ]);

      const data10 = await bookings.aggregate([
        {
          $match: {
            createdAt: {
              $gt: new Date(new Date() - 12 * 4 * 7 * 60 * 60 * 24 * 1000),
            },
          },
        },
      ]);

      let data8 = {
        user: data2.length,
        hero: data6.length,
        booking: data10.length,
      };
      console.log(data8);
      return res.status(200).send({ data: data8 });
    }

    if (d == "today") {
      const data11 = await userSchema.aggregate([
        {
          $match: {
            createdAt: {
              $gt: new Date(new Date()),
            },
          },
        },
      ]);

      const data12 = await heroSchema.aggregate([
        {
          $match: {
            createdAt: {
              $gt: new Date(new Date()),
            },
          },
        },
      ]);

      const data13 = await bookings.aggregate([
        {
          $match: {
            createdAt: {
              $gt: new Date(new Date()),
            },
          },
        },
      ]);

      let data14 = {
        user: data11.length,
        hero: data12.length,
        booking: data13.length,
      };
      console.log(data14);
      return res.status(200).send({ data: data14 });
    }
  } catch (err) {
    console.log(err);
  }
};

// module.exports.getMonthwise = async (req, res) => {
//   try {
//     const d = req.params.d;
//     console.log(d)

//     if (d=="monthly") {
//       const data1 = await userSchema.aggregate([
//         {
//           $group: {
//             _id: {
//               month: {
//                 $month: "$createdAt",
//               } ,
//             },
//             user: { $sum: 1 },
//           },
//         },
//         {
//           $sort: {
//             count: -1,
//           },
//         },
//       ]);

//       const data5 = await heroSchema.aggregate([
//         {
//           $group: {
//             _id: {
//             month: {
//                 $month: "$createdAt",
//               }
//             },
//             hero: { $sum: 1 },
//           },
//         },
//         {
//           $sort: {
//             count: -1,
//           },
//         },
//       ]);

//       const data9 = await bookings.aggregate([
//         {
//           $group: {
//             _id: {
//              month: {
//                 $month: "$createdAt",
//               },
//             },
//             booking: { $sum: 1 },
//           },
//         },
//         {
//           $sort: {
//             count: -1,
//           },
//         },
//       ]);

//       let data4 = {
//         user: data1,
//         hero: data5,
//         booking: data9,
//       };
//       console.log(data4);

//       return res.status(200).send({ data4 });
//     }

//        if (d == "yearly") {
//       const data2 = await userSchema.aggregate([
//         {
//           $group: {
//             _id: {
//               year: {
//                 $year: "$createdAt",
//               },
//             },
//             user: { $sum: 1 },
//           },
//         },
//         {
//           $sort: {
//             count: -1,
//           },
//         },
//       ]);

//       const data6 = await heroSchema.aggregate([
//         {
//           $group: {
//             _id: {
//               year: {
//                 $year: "$createdAt",
//               },
//             },
//             hero: { $sum: 1 },
//           },
//         },
//         {
//           $sort: {
//             count: -1,
//           },
//         },
//       ]);

//       const data10 = await bookings.aggregate([
//         {
//           $group: {
//             _id: {
//               year: {
//                 $year: "$createdAt",
//               },
//             },
//             booking: { $sum: 1 },
//           },
//         },
//         {
//           $sort: {
//             count: -1,
//           },
//         },
//       ]);

//       let data8 = {
//         user: data2,
//         hero: data6,
//         booking: data10,
//       };
//       console.log(data8);
//       return res.status(200).send({ data8: data8 });
//     }

//       if (d == "weekly") {
//       const data3 = await userSchema.aggregate([
//         {
//           $group: {
//             _id: {
//               /*year: { $year: "$createdAt" }, month: { $month: "$createdAt" },*/ week: {
//                 $week: "$createdAt",
//               },
//             },
//             user: { $sum: 1 },
//           },
//         },
//         {
//           $sort: {
//             count: -1,
//           },
//         },
//       ]);

//       const data7 = await heroSchema.aggregate([
//         {
//           $group: {
//             _id: {
//               /*year: { $year: "$createdAt" }, month: { $month: "$createdAt" },*/ week: {
//                 $week: "$createdAt",
//               },
//             },
//             hero: { $sum: 1 },
//           },
//         },
//         {
//           $sort: {
//             count: -1,
//           },
//         },
//       ]);

//       const data11 = await bookings.aggregate([
//         {
//           $group: {
//             _id: {
//               /*year: { $year: "$createdAt" }, month: { $month: "$createdAt" },*/ week: {
//                 $week: "$createdAt",
//               },
//             },
//             booking: { $sum: 1 },
//           },
//         },
//         {
//           $sort: {
//             count: -1,
//           },
//         },
//       ]);

//       let data12 = {
//         user: data3,
//         hero: data7,
//         booking: data11,
//       };
//       console.log(data12);
//       return res.status(201).json({
//         data12: data12,
//       });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
