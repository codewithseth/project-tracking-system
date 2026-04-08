const Footer = () => {
  return (
    <footer className="bg-body-tertiary py-3 mt-auto">
      <div className="container text-center">
        <small className="text-muted">
          © {new Date().getFullYear()} Project Tracker. All rights reserved.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
