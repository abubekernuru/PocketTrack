import { Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Button,
  Card,
} from "flowbite-react";
import {
  HiOutlineChartBar,
  HiOutlineCash,
  HiOutlineTrendingUp,
  HiOutlineUserAdd,
  HiOutlineClipboardList,
  HiOutlinePresentationChartLine,
} from "react-icons/hi";

export default function Home() {
  const { currentUser, theme } = useSelector((state) => state.user);

  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center text-center">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-1 mb-6 text-sm font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
            Personal Finance Management
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Maal Tracker
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10">
            Track your income, control expenses, and gain financial clarity with
            smart insights and beautiful analytics.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button
                size="xl"
                className="bg-green-600 hover:bg-green-700"
              >
                Get Started
              </Button>
            </Link>

            <Link to="/login">
              <Button color="gray" size="xl">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Everything you need to manage your personal finances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-100 dark:bg-red-900 mb-4">
              <HiOutlineCash className="text-3xl text-red-600 dark:text-red-400" />
            </div>

            <h3 className="text-2xl font-semibold mb-3">
              Track Expenses
            </h3>

            <p className="text-gray-600 dark:text-gray-400">
              Easily record daily income and expenses to stay aware of your
              spending habits.
            </p>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
              <HiOutlineChartBar className="text-3xl text-blue-600 dark:text-blue-400" />
            </div>

            <h3 className="text-2xl font-semibold mb-3">
              Visualize Patterns
            </h3>

            <p className="text-gray-600 dark:text-gray-400">
              Understand where your money goes with interactive charts and
              spending analytics.
            </p>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-100 dark:bg-green-900 mb-4">
              <HiOutlineTrendingUp className="text-3xl text-green-600 dark:text-green-400" />
            </div>

            <h3 className="text-2xl font-semibold mb-3">
              Plan Ahead
            </h3>

            <p className="text-gray-600 dark:text-gray-400">
              Gain financial clarity and make smarter budgeting decisions for
              the future.
            </p>
          </Card>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">
              How It Works
            </h2>

            <p className="text-gray-600 dark:text-gray-400">
              Start managing your finances in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-5">
                <HiOutlineUserAdd className="text-3xl text-blue-600 dark:text-blue-400" />
              </div>

              <h3 className="text-xl font-semibold mb-3">
                Register
              </h3>

              <p className="text-gray-600 dark:text-gray-400">
                Create your account securely and access your personal dashboard.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mb-5">
                <HiOutlineClipboardList className="text-3xl text-red-600 dark:text-red-400" />
              </div>

              <h3 className="text-xl font-semibold mb-3">
                Add Transactions
              </h3>

              <p className="text-gray-600 dark:text-gray-400">
                Record income and expenses quickly with organized categories.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-5">
                <HiOutlinePresentationChartLine className="text-3xl text-green-600 dark:text-green-400" />
              </div>

              <h3 className="text-xl font-semibold mb-3">
                View Insights
              </h3>

              <p className="text-gray-600 dark:text-gray-400">
                Analyze your financial activity using charts and monthly
                analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">
            Maal Tracker
          </h3>

          <p className="text-gray-600 dark:text-gray-400">
            Smart expense tracking for a better financial future.
          </p>
        </div>
      </footer>
    </div>
  );
}