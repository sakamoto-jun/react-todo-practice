import { User } from "../types";

export const getUser = async (): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userName = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("username="))
        ?.split("=")[1];

      if (userName) {
        return resolve({ username: userName });
      }
      return reject(new Error("Not logged in!"));
    }, 500);
  });
};

const userData = [
  { username: "admin", password: "admin" },
  { username: "user", password: "1234" },
];
export const login = async (
  username: string,
  password: string
): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const matchUser = userData.find(
        (user) => user.username === username && user.password === password
      );

      if (matchUser) {
        document.cookie = `username=${matchUser.username}`;
        resolve({ username: matchUser.username });
      } else {
        reject(new Error("Invalid username or password!"));
      }
    }, 500);
  });
};
