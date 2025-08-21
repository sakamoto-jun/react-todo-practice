import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../hooks/useRedux";
import { login } from "../store/commonSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = (formData.get("username") ?? "") as string;
    const password = (formData.get("password") ?? "") as string;

    if (!username || !password) return;

    try {
      dispatch(login({ username, password }));
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
