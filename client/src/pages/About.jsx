import { Card, Badge } from "flowbite-react";
import {
  HiOutlineCash,
  HiOutlineChartPie,
  HiOutlineTrendingUp,
  HiOutlineShieldCheck,
  HiOutlineDatabase,
  HiOutlineCode,
  HiOutlineLightningBolt,
  HiOutlineCheckCircle,
  HiOutlineEye,
} from "react-icons/hi";

export default function About() {
  const features = [
    "Transaction Management",
    "Analytics Dashboard",
    "Monthly Financial Reports",
    "Category-Based Insights",
    "Secure Authentication",
    "Responsive Design",
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* HEADER */}
        <div className="text-center mb-16">
          <Badge color="success" className="inline-flex mb-5">
            About Clarity
          </Badge>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            A Modern Personal Finance Tracking Platform
          </h1>

          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Clarity is a modern personal finance management application designed to help users 
            track income, manage expenses, analyze financial activity, and make smarter budgeting 
            decisions through intuitive analytics and clean user experience.
          </p>
        </div>

        {/* WHY THIS APP WAS BUILT - IMPROVED COPY */}
        <section className="mb-16">
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
            <h2 className="text-3xl font-bold mb-4">
              Why This Product Exists
            </h2>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Many people track expenses manually in notebooks or scattered notes, making it 
              difficult to understand spending patterns or plan finances effectively. Clarity 
              was built to transform daily financial tracking into a simple, organized, and 
              insightful digital experience.
            </p>
          </Card>
        </section>

        {/* MISSION SECTION - NEW */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <HiOutlineEye className="text-5xl text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              To democratize financial intelligence and help everyone — regardless of financial literacy level — 
              understand and improve their spending habits through accessible, modern technology.
            </p>
          </div>
        </section>

        {/* TECH STACK - WITH DESCRIPTIONS */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            Built With Modern Technology
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Card className="text-center bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
              <HiOutlineCode className="mx-auto text-4xl text-blue-600 mb-3" />
              <h3 className="font-semibold text-lg mb-1">React</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Dynamic and responsive frontend UI</p>
            </Card>

            <Card className="text-center bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
              <HiOutlineDatabase className="mx-auto text-4xl text-green-600 mb-3" />
              <h3 className="font-semibold text-lg mb-1">MongoDB</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Flexible database for transaction management</p>
            </Card>

            <Card className="text-center bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
              <HiOutlineLightningBolt className="mx-auto text-4xl text-yellow-500 mb-3" />
              <h3 className="font-semibold text-lg mb-1">Express & Node.js</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Scalable backend API architecture</p>
            </Card>

            <Card className="text-center bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
              <HiOutlineShieldCheck className="mx-auto text-4xl text-red-500 mb-3" />
              <h3 className="font-semibold text-lg mb-1">JWT Authentication</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Secure user authentication and protected routes</p>
            </Card>
          </div>
        </section>

        {/* CORE FEATURES - UPDATED LIST */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            What You Can Do With Clarity
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                <HiOutlineCheckCircle className="text-green-600 text-xl flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* VISION - REPLACES PERSONAL NOTE */}
        <section>
          <Card className="bg-gradient-to-r from-green-600 to-blue-600 border-0 text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-4">
              Our Vision
            </h2>

            <p className="text-lg leading-relaxed">
              Clarity aims to simplify personal finance management by helping users better 
              understand their money, spending habits, and financial goals through modern 
              technology and intuitive design.
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
}