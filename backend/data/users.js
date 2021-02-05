import bcrypt from "bcryptjs";
const users = [
  {
    name: "Admin User",
    userName: "admin",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Waggner",
    userName: "john",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Jane Doe",
    userName: "jane",
    password: bcrypt.hashSync("123456", 10),
  },
];
export default users;
