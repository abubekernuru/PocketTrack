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
  HiOutlineUsers,
  HiOutlineSparkles,
  HiOutlineHeart,
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
      {/* HERO SECTION - matching home page style */}
      <section className="max-w-7xl mx-auto px-4 py-24 flex flex-col items-center text-center">
        <Badge color="success" className="inline-flex mb-5 px-4 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
          About Clarity
        </Badge>

        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight max-w-3xl">
          A Modern Personal{" "}
          <span className="text-green-600 dark:text-green-400">Finance Platform</span>
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl">
          Clarity is a modern personal finance management application designed to help users 
          track income, manage expenses, analyze financial activity, and make smarter budgeting 
          decisions through intuitive analytics and clean user experience.
        </p>
      </section>

      {/* WHY THIS APP WAS BUILT - matching feature card style */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900">
              <HiOutlineHeart className="text-2xl text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl font-bold">Why This Product Exists</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            Many people track expenses manually in notebooks or scattered notes, making it 
            difficult to understand spending patterns or plan finances effectively. Clarity 
            was built to transform daily financial tracking into a simple, organized, and 
            insightful digital experience.
          </p>
        </div>
      </section>

      {/* MISSION SECTION - with icon styling matching home page */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mx-auto mb-6">
            <HiOutlineEye className="text-3xl text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            To democratize financial intelligence and help everyone — regardless of financial literacy level — 
            understand and improve their spending habits through accessible, modern technology.
          </p>
        </div>
      </section>

      {/* TECH STACK - matching home page feature cards */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Built With Modern Technology</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Enterprise-grade stack for reliability and performance
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-md transition-shadow text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mx-auto mb-4">
              <HiOutlineCode className="text-2xl text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">React</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Dynamic and responsive frontend UI</p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-md transition-shadow text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 mx-auto mb-4">
              <HiOutlineDatabase className="text-2xl text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">MongoDB</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Flexible database for transaction management</p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-md transition-shadow text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900 mx-auto mb-4">
              <HiOutlineLightningBolt className="text-2xl text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Express & Node.js</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Scalable backend API architecture</p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-md transition-shadow text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 mx-auto mb-4">
              <HiOutlineShieldCheck className="text-2xl text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">JWT Authentication</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Secure user authentication and protected routes</p>
          </div>
        </div>
      </section>

      {/* CORE FEATURES - matching home page list style */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">What You Can Do With Clarity</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Everything you need to take control of your personal finances
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
              <HiOutlineCheckCircle className="text-green-600 dark:text-green-400 text-xl flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* STATS SECTION - matching home page social proof */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-12 text-center">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">2,400+</div>
              <div className="text-sm text-green-100">Active users</div>
            </div>
            <div className="hidden sm:block w-px bg-green-400" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white">$1.2M</div>
              <div className="text-sm text-green-100">Tracked monthly</div>
            </div>
            <div className="hidden sm:block w-px bg-green-400" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white">98%</div>
              <div className="text-sm text-green-100">Satisfaction rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION SECTION - matching CTA style from home page */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-12 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mx-auto mb-6">
            <HiOutlineSparkles className="text-3xl text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Vision
          </h2>
          <p className="text-white text-lg leading-relaxed max-w-3xl mx-auto">
            Clarity aims to simplify personal finance management by helping users better 
            understand their money, spending habits, and financial goals through modern 
            technology and intuitive design.
          </p>
        </div>
      </section>
    </div>
  );
}