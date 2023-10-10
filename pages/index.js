import Layout from "../interface/components/layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <section className="flex flex-col items-center justify-center mt-16 mx-auto">
        <div className="flex items-center justify-center text-2xl text-slate-50 mb-6 font-semibold">
          <p>Keep track of your boardgame collection</p>
        </div>
        <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-lg">
          <div className="py-6 px-8">
            <div className="my-4">
              <h1 className="text-slate-50 font-semibold text-2xl">
                Sign in to your account
              </h1>
            </div>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-slate-50 mb-2 text-sm"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-gray-700 rounded-lg p-2.5 block border border-gray-600 text-slate-200"
                  placeholder="name@email.com"
                  required
                  autoComplete="on"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-slate-50 mb-2 text-sm"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full bg-gray-700 rounded-lg p-2.5 block border border-gray-600 text-slate-200"
                  placeholder="••••••••"
                  required
                  autoComplete="on"
                />
              </div>
              <div className="flex flex-col items-center justify-between">
                <button
                  type="submit"
                  className="w-full my-4 rounded-lg p-2.5 bg-blue-700 text-base font-medium text-slate-50"
                >
                  Sign In
                </button>
                <p className="text-base text-gray-300">
                  Don't have an account yet?{" "}
                  <Link className="text-blue-500 font-semibold" href="/signup">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
