import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/userApi";
import useStore from "../useStore";

const Login = () => {
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = (formData.get("username") ?? "") as string;
    const password = (formData.get("password") ?? "") as string;

    if (!username || !password) return;

    try {
      const user = await login(username, password);
      setUser(user);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label htmlFor="username">username</label>
          <input type="text" name="username" id="username" />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="password" name="password" id="password" />
        </div>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
