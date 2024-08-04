const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string

export default function Login() {
  const google = () => {
    window.open(`${BACKEND_URL}/auth/google`, '_self')
  }

  const github = () => {
    window.open(`${BACKEND_URL}/auth/github`, '_self')
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="mb-2 text-3xl font-bold ">CodeColiseum</h1>
          </div>
          <div className="grid gap-4">
            <div className="flex w-full items-center justify-center">
              <div className="mr-2 w-[5.5rem] h-[1px] bg-gray-400"></div>
              <span className="text-gray-600">OR CONTINUE WITH</span>
              <div className="ml-2 w-[5.5rem] h-[1px] bg-gray-400"></div>
            </div>
            <button className="w-full" onClick={google}>
              Login with Google
            </button>
            <button className="w-full" onClick={github}>
              Login with Github
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
