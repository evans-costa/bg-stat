import Link from "next/link";
import Layout from "../../interface/components/layout";

export default function SignUp() {
  return (
    <Layout>
      <section className="flex flex-col items-center justify-center mt-16 mx-auto">
        <div className="w-full max-w-lg bg-gray-900 border-gray-700 rounded-lg">
          <div className="py-8 px-6">
            <div className="my-4">
              <h1 className="text-slate-50 font-semibold text-2xl">Sign up</h1>
            </div>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-slate-50 text-sm mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="off"
                  className="w-full bg-gray-700 rounded-lg p-2.5 block border border-gray-600 text-slate-200"
                />
              </div>
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
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 rounded border border-gray-600 accent-blue cursor-pointer bg-gray-700"
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 text-sm font-medium text-slate-50"
                  >
                    I agree with the{" "}
                    <Link className="text-blue-500 font-semibold" href="#">
                      terms and conditions
                    </Link>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full my-4 rounded-lg p-2.5 bg-blue-700 text-base font-medium text-slate-50"
              >
                Register new account
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
