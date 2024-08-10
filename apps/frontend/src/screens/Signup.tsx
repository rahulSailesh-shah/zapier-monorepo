import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

const Signup = () => {
  const navigate = useNavigate();
  const google = () => {
    window.open(`${BACKEND_URL}/auth/google`, "_self");
  };

  const github = () => {
    window.open(`${BACKEND_URL}/auth/github`, "_self");
  };
  return (
    <div className="h-screen flex justify-center bg-base-300 items-center">
      <div className="card bg-base-100 mx-auto w-96 border shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Signup</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <span className="label-text">First Name</span>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="grid gap-2">
                <span className="label-text">Last Name</span>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <span className="label-text">Email</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>
            <div className="grid gap-2">
              <span className="label-text">Password</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Signup
            </button>

            <div className="flex w-full flex-col border-opacity-50">
              <div className="divider">OR</div>
            </div>

            <button
              className="btn btn-primary btn-outline"
              onClick={() => google()}
            >
              Signup with Google
            </button>
            <button
              className="btn btn-primary btn-outline"
              onClick={() => github()}
            >
              Signup with Github
            </button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <a onClick={() => navigate("/login")} className="link">
              Login
            </a>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default Signup;
