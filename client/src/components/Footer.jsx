import {
  Footer,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";
import { HiChartPie } from "react-icons/hi";

function FooterComp() {
  return (
    <Footer container className="border-t border-gray-200 dark:border-gray-700 rounded-none">
      <div className="w-full">

        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">

          {/* BRAND — matches header logo exactly */}
          <div className="mb-6 sm:mb-0">
            <a href="/" className="flex items-center gap-2.5 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500">
                <HiChartPie className="text-white text-lg" />
              </div>
              <span className="text-xl font-semibold text-gray-800 dark:text-white">
                Clar<span className="text-blue-500">ity</span>
              </span>
            </a>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
              Build smarter financial habits through modern expense tracking and analytics.
            </p>
          </div>

          {/* LINKS */}
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:gap-6">
            <div>
              <FooterTitle title="Product" />
              <FooterLinkGroup col>
                <FooterLink href="/">Home</FooterLink>
                <FooterLink href="/about">About</FooterLink>
                <FooterLink href="/dashboard">Dashboard</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Follow us" />
              <FooterLinkGroup col>
                <FooterLink href="#" target="_blank" rel="noopener noreferrer">
                  GitHub
                </FooterLink>
                <FooterLink href="#" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </FooterLink>
                <FooterLink href="#" target="_blank" rel="noopener noreferrer">
                  Twitter
                </FooterLink>
              </FooterLinkGroup>
            </div>
          </div>

        </div>

        <FooterDivider />

        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="/" by="Clarity" year={new Date().getFullYear()} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon href="#" icon={BsGithub} aria-label="GitHub" />
            <FooterIcon href="#" icon={BsLinkedin} aria-label="LinkedIn" />
            <FooterIcon href="#" icon={BsTwitter} aria-label="Twitter" />
          </div>
        </div>

      </div>
    </Footer>
  );
}

export default FooterComp;