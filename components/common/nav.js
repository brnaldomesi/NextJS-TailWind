import Link from 'next/link'
import Menu from './menu'

export default function Nav() {
  return (
    <header className="m-header-container">
      <div className="m-header-gap container">
      <div className="m-header-menu">
        <span className="lg:hidden">
          <Menu
            title="Options"
            options={[
              () => (
                <span className="m-header-create-job-btn">
                  Create Job
                </span>
              ),
              'Profile',
              'Jobs',
              'Professional Network',
              'Lounge',
              'Salary',
            ]}
            optionHandle={(e) => console.log(e.target)}
          />
        </span>

        <Link href="/">
          <h1 className="text-blue-500 text-xl mx-2">Health Explore</h1>
        </Link>
      </div>

      <div className="hidden lg:flex space-x-10">
        <h2>Profile</h2>
        <h2>Jobs</h2>
        <h2>Professional Network</h2>
        <h2>Lounge</h2>
        <h2>Salary</h2>
      </div>

      <div className="m-header-right space-x-4">
        <button className="m-header-create-job-btn_ lg:flex">
          Create Job
        </button>

        <span className="m-header-avatar-container">
          <div className="m-header-avatar">
            JO
          </div>
          <span className="m-header-avatar-badge">
            2
          </span>
        </span>

        <h2 className="hidden lg:flex">Logout</h2>

      </div>
      </div>
    </header>
  );
}
