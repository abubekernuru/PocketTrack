import { Card, Badge } from "flowbite-react";
import {
  HiOutlineCash,
  HiOutlineChartPie,
  HiOutlineTrendingUp,
  HiOutlineShieldCheck,
  HiOutlineDatabase,
  HiOutlineCode,
  HiOutlineLightningBolt,
} from "react-icons/hi";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* HEADER */}
        <div className="text-center mb-16">
          <Badge color="success" className="inline-flex mb-5">
            About Maal Tracker
          </Badge>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Smart Personal Expense Tracking
          </h1>

          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Maal Tracker is a modern MERN stack expense tracking application
            designed to help users manage income, expenses, and financial goals
            with simplicity and powerful analytics.
          </p>
        </div>

        {/* DESCRIPTION */}
        <section className="mb-16">
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
            <h2 className="text-3xl font-bold mb-4">
              Why This App Was Built
            </h2>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Managing daily expenses manually can become confusing and
              inefficient over time. Maal Tracker was created to provide a
              simple digital solution for tracking financial activity,
              understanding spending behavior, and planning future finances more
              effectively.
            </p>
          </Card>
        </section>

        {/* TECH STACK */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            Tech Stack
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <Card className="text-center bg-white dark:bg-gray-800">
              <HiOutlineCode className="mx-auto text-4xl text-blue-600 mb-3" />
              <h3 className="font-semibold text-lg">
                React
              </h3>
            </Card>

            <Card className="text-center bg-white dark:bg-gray-800">
              <HiOutlineDatabase className="mx-auto text-4xl text-green-600 mb-3" />
              <h3 className="font-semibold text-lg">
                MongoDB
              </h3>
            </Card>

            <Card className="text-center bg-white dark:bg-gray-800">
              <HiOutlineLightningBolt className="mx-auto text-4xl text-yellow-500 mb-3" />
              <h3 className="font-semibold text-lg">
                Express & Node.js
              </h3>
            </Card>

            <Card className="text-center bg-white dark:bg-gray-800">
              <HiOutlineShieldCheck className="mx-auto text-4xl text-red-500 mb-3" />
              <h3 className="font-semibold text-lg">
                JWT Authentication
              </h3>
            </Card>
          </div>
        </section>

        {/* FEATURES */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            Core Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white dark:bg-gray-800">
              <div className="flex items-start gap-4">
                <HiOutlineCash className="text-4xl text-green-600" />

                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Income & Expense Tracking
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400">
                    Add, edit, and manage transactions with categorized expense
                    tracking.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-white dark:bg-gray-800">
              <div className="flex items-start gap-4">
                <HiOutlineChartPie className="text-4xl text-blue-600" />

                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Interactive Analytics
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400">
                    Visualize spending patterns through charts and monthly
                    reports.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-white dark:bg-gray-800">
              <div className="flex items-start gap-4">
                <HiOutlineTrendingUp className="text-4xl text-red-600" />

                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Financial Planning
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400">
                    Track balance trends and make informed budgeting decisions.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-white dark:bg-gray-800">
              <div className="flex items-start gap-4">
                <HiOutlineShieldCheck className="text-4xl text-purple-600" />

                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Secure Authentication
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400">
                    JWT cookie authentication ensures secure user sessions and
                    protected routes.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* PERSONAL NOTE */}
        <section>
          <Card className="bg-gradient-to-r from-green-600 to-blue-600 border-0 text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-4">
              Personal Note
            </h2>

            <p className="text-lg leading-relaxed">
              Maal Tracker was built as a real-world project inspired by the
              challenge of manually tracking daily journal expenses. The goal
              was to create a clean and practical digital finance tool while
              improving full stack development skills using the MERN stack.
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
}