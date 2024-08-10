import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

const Login = () => {
  const navigate = useNavigate();
  const google = () => {
    window.open(`${BACKEND_URL}/auth/google`, "_self");
  };

  const github = () => {
    window.open(`${BACKEND_URL}/auth/github`, "_self");
  };

  return (
    <div className="dark h-screen flex bg-base-300 justify-center items-center">
      <div className="card bg-base-100 mx-auto w-96 shadow-sm border">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <span className="label-text">Email</span>

              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="grid gap-2">
              <span className="label-text">Password</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
              <a href="#" className="link ml-auto mt-2">
                Forgot your password?
              </a>
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>

            <div className="flex w-full flex-col border-opacity-50">
              <div className="divider">OR</div>
            </div>

            <button
              className="btn btn-primary btn-outline"
              onClick={() => google()}
            >
              Login with Google
            </button>
            <button
              className="btn btn-primary btn-outline"
              onClick={() => github()}
            >
              Login with Github
            </button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a onClick={() => navigate("/signup")} className="link">
              Sign up
            </a>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default Login;
