// export const InitializeData = () => {
//   await getTransactions(
//     (transactions: Transaction[]) => {
//       setTransactions(transactions);
//     },
//     (message: string) => {
//       toast(message, "Error");
//     }
//   );

//   await getSupports(
//     (supports: Support[]) => {
//       setSupports(supports);
//     },
//     (message: string) => {
//       toast(message, "Error");
//     }
//   );

//   if (user?.role === "ADMIN") {
//     await getAllUsers(
//       (users: User[]) => {
//         setUsersData(users);
//       },
//       (message: string) => {
//         toast(message, "Error");
//       }
//     );

//     await getAllTransactions(
//       (transactions: Transaction[]) => {
//         setAllTransactions(transactions);
//       },
//       (message: string) => {
//         toast(message, "Error");
//       }
//     );

//     await getAllSupports(
//       (supports: Support[]) => {
//         setAllSupports(supports);
//       },
//       (message: string) => {
//         toast(message, "Error");
//       }
//     );
//   }

//   const newUser: User = {
//     ...user,
//     sentTransactions: [],
//     receivedTransactions: [],
//     recentDeposit: user?.receivedTransactions
//       ?.filter((transaction: Transaction) => transaction.type === "DEPOSIT")
//       .sort(
//         (a: Transaction, b: Transaction) =>
//           new Date(b?.created_at || "").getTime() -
//           new Date(a?.created_at || "").getTime()
//       )[0]?.amount,
//     recentWithdrawal: user?.sentTransactions
//       ?.filter((transaction: Transaction) => transaction.type === "WITHDRAWAL")
//       .sort(
//         (a: Transaction, b: Transaction) =>
//           new Date(b?.created_at || "").getTime() -
//           new Date(a?.created_at || "").getTime()
//       )[0]?.amount,
//     recentBonus: user?.receivedTransactions
//       ?.filter((transaction: Transaction) => transaction.type === "BONUS")
//       .sort(
//         (a: Transaction, b: Transaction) =>
//           new Date(b?.created_at || "").getTime() -
//           new Date(a?.created_at || "").getTime()
//       )[0]?.amount,
//     recentWithdrawStatus: user?.sentTransactions
//       ?.filter((transaction: Transaction) => transaction.type === "WITHDRAWAL")
//       .sort(
//         (a: Transaction, b: Transaction) =>
//           new Date(b?.created_at || "").getTime() -
//           new Date(a?.created_at || "").getTime()
//       )[0]?.status,
//   };
//   setUserData(newUser);
// };
