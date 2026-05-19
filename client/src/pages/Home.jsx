import { Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "flowbite-react";
import {
  HiOutlineChartBar,
  HiOutlineCash,
  HiOutlineTrendingUp,
} from "react-icons/hi";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);

  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 py-24 flex flex-col items-center text-center">
        <span className="inline-block px-4 py-1 mb-6 text-sm font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
          Personal finance management
        </span>

        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight max-w-3xl">
          Financial clarity{" "}
          <span className="text-green-600 dark:text-green-400">starts here</span>
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-xl">
          Clarity helps you track expenses, monitor income, analyze spending
          patterns, and build better financial habits — all in one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register">
            <Button size="xl" className="cursor-pointer bg-green-600 hover:bg-green-700 w-full sm:w-auto">
              Get started
            </Button>
          </Link>
          <Link to="/login">
            <Button color="gray" size="xl" className="cursor-pointer w-full sm:w-auto">
              Log in
            </Button>
          </Link>
        </div>

        {/* SOCIAL PROOF */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mt-14">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">2,400+</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Active users</div>
          </div>
          <div className="hidden sm:block w-px bg-gray-200 dark:bg-gray-700" />
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">$1.2M</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Tracked monthly</div>
          </div>
          <div className="hidden sm:block w-px bg-gray-200 dark:bg-gray-700" />
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">98%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Satisfaction rate</div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Powerful features</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Everything you need to take control of your personal finances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 mb-4">
              <HiOutlineCash className="text-2xl text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Track expenses</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Record daily transactions quickly and organize them into categories
              to better understand your spending behavior.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
              <HiOutlineChartBar className="text-2xl text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Visual analytics</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Interactive charts and monthly summaries help you identify patterns
              and make smarter financial decisions.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
              <HiOutlineTrendingUp className="text-2xl text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Plan ahead</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Monitor balances, control unnecessary expenses, and build healthier
              budgeting habits over time.
            </p>
          </div>
        </div>
      </section>

      {/* ANALYTICS PREVIEW */}
      <section className="bg-white dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div>
              <span className="inline-block px-4 py-1 mb-4 text-sm font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                Visual intelligence
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-5">
                Understand your spending at a glance
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
                Interactive charts, category breakdowns, and monthly trends help
                you see exactly where your money goes — no spreadsheets required.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                  Real-time expense tracking
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                  Monthly spending summaries
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />
                  Category-wise analytics
                </li>
              </ul>
            </div>

            {/* PREVIEW CARD — clean border, no gradient wrapper */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-gray-50 dark:bg-gray-900">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-5">
                This month's breakdown
              </p>

              {[
                { label: "Food & dining", amount: "$450", width: "75%", color: "bg-green-500" },
                { label: "Transport",     amount: "$120", width: "40%", color: "bg-blue-500"  },
                { label: "Entertainment", amount: "$85",  width: "28%", color: "bg-purple-500"},
                { label: "Utilities",     amount: "$60",  width: "18%", color: "bg-orange-500"},
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3 mb-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-28 flex-shrink-0">
                    {row.label}
                  </span>
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${row.color}`}
                      style={{ width: row.width }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 w-10 text-right">
                    {row.amount}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-3">How it works</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Start managing your finances in three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              color: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
              title: "Register",
              desc: "Create your account securely and access your personal dashboard.",
            },
            {
              step: "2",
              color: "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400",
              title: "Add transactions",
              desc: "Record income and expenses quickly with organized categories.",
            },
            {
              step: "3",
              color: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
              title: "View insights",
              desc: "Analyze your financial activity using charts and monthly analytics.",
            },
          ].map((item) => (
            <div key={item.step} className="flex flex-col items-center text-center px-4">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-5 text-xl font-bold ${item.color}`}>
                {item.step}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="bg-green-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to gain financial clarity?
          </h2>
          <p className="text-white text-lg mb-8 opacity-90">
            Join thousands of users taking control of their finances today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button
                size="lg"
                className="cursor-pointer bg-white text-green-700 hover:bg-gray-100 font-semibold w-full sm:w-auto dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
              >
                Create account
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="lg"
                color="dark"
                outline
                className="cursor-pointer border-2 border-white text-white hover:bg-white hover:text-green-700 w-full sm:w-auto dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-white"
              >
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}