export default function Footer() {
  return (
    <div className="m-footer-container">

      <div className="m-footer-section lg:w-2/4">
        <h2 className="font-bold">About us</h2>
        <p className="">
          We are a team of nurses, doctors, technologists and executives
          dedicated to help nurses find jobs that they love.
        </p>
        <br />
        <p className="">
          {' '}
          All copyright reserved &copy; 2020 - Health Explore
        </p>
      </div>

      <div className="m-footer-section lg:w-1/4">
        <h2 className="font-bold">Sitemap</h2>
        <p className="">
          Nurses<br/>
          Employers<br/>
          Social networking<br/>
          Jobs<br/>
        </p>
      </div>

      <div className="m-footer-section lg:w-1/4">
        <h2 className="font-bold">Privacy</h2>
        <p className="">
          Terms of use<br/>
          Privacy policy<br/>
          Cookie policy
        </p>
      </div>
    </div>
  );
}
