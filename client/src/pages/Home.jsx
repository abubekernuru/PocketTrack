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
  HiOutlineShieldCheck,
  HiOutlineDesktopComputer,
  HiOutlineLightBulb,
  HiOutlineDeviceMobile,
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
            Financial Clarity <span className="text-green-600">Starts Here</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10">
            Clarity helps you track expenses, monitor income, analyze spending patterns, 
            and build better financial habits — all in one place.
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
            Everything you need to take control of your personal finances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-100 dark:bg-red-900 mb-4">
              <HiOutlineCash className="text-3xl text-red-600 dark:text-red-400" />
            </div>

            <h3 className="text-2xl font-semibold mb-3">
              Track Expenses
            </h3>

            <p className="text-gray-600 dark:text-gray-400">
              Record daily transactions quickly and organize them into categories 
              to better understand your spending behavior.
            </p>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
              <HiOutlineChartBar className="text-3xl text-blue-600 dark:text-blue-400" />
            </div>

            <h3 className="text-2xl font-semibold mb-3">
              Visual Analytics
            </h3>

            <p className="text-gray-600 dark:text-gray-400">
              Interactive charts and monthly summaries help you identify patterns 
              and make smarter financial decisions.
            </p>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-100 dark:bg-green-900 mb-4">
              <HiOutlineTrendingUp className="text-3xl text-green-600 dark:text-green-400" />
            </div>

            <h3 className="text-2xl font-semibold mb-3">
              Plan Ahead
            </h3>

            <p className="text-gray-600 dark:text-gray-400">
              Monitor balances, control unnecessary expenses, and build healthier 
              budgeting habits over time.
            </p>
          </Card>
        </div>
      </section>

      {/* WHY CLARITY SECTION - NEW */}
      <section className="bg-white dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose Clarity?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Built with you in mind — simple, insightful, and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-100 dark:bg-green-900 mx-auto mb-4">
                <HiOutlineDesktopComputer className="text-3xl text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Simple</h3>
              <p className="text-gray-600 dark:text-gray-400">Clean and beginner-friendly interface.</p>
            </Card>

            <Card className="text-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900 mx-auto mb-4">
                <HiOutlineLightBulb className="text-3xl text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Insightful</h3>
              <p className="text-gray-600 dark:text-gray-400">Powerful analytics without complexity.</p>
            </Card>

            <Card className="text-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900 mx-auto mb-4">
                <HiOutlineShieldCheck className="text-3xl text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure</h3>
              <p className="text-gray-600 dark:text-gray-400">Protected authentication and private financial data.</p>
            </Card>

            <Card className="text-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900 mx-auto mb-4">
                <HiOutlineDeviceMobile className="text-3xl text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Responsive</h3>
              <p className="text-gray-600 dark:text-gray-400">Works beautifully across desktop and mobile devices.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* ANALYTICS PREVIEW SECTION - NEW */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1 mb-4 text-sm font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              Visual Intelligence
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Understand Your Spending at a Glance
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              Interactive charts, category breakdowns, and monthly trends help you 
              see exactly where your money goes — no spreadsheets required.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Real-time expense tracking</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Monthly spending summaries</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Category-wise analytics</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl p-1 shadow-2xl">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <div className="mb-6">
                <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <HiOutlinePresentationChartLine className="text-6xl text-green-500" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Food & Dining</span>
                  <div className="w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-semibold">$450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Transportation</span>
                  <div className="w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-blue-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-semibold">$120</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Entertainment</span>
                  <div className="w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-purple-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-semibold">$85</span>
                </div>
              </div>
            </div>
          </div>
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
                Analyze your financial activity using charts and monthly analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION - NEW */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-12 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Gain Financial Clarity?
          </h2>
          <p className="text-white text-lg mb-8 opacity-90">
            Join thousands of users taking control of their finances today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Create Account
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" color="transparent" className="border-2 border-white text-white hover:bg-white hover:text-green-600">
                Explore Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER - IMPROVED */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2 text-green-600 dark:text-green-500">
            Clarity
          </h3>

          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Clarity helps individuals build smarter financial habits through modern 
            expense tracking and analytics.
          </p>
        </div>
      </footer>
    </div>
  );
}