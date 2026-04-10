import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-sm border-0">
          <div className="card-body p-5 text-center">
            <h2 className="h4 fw-bold text-primary mb-4">My Profile</h2>
            <div
              className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
              style={{ width: "80px", height: "80px" }}
            >
              <i className="bi bi-person-fill fs-1 text-primary"></i>
            </div>
            <h3 className="h5 fw-bold mb-2">Username</h3>
            <p className="text-muted fs-5">{user?.username}</p>
            <hr className="my-4" />
            <p className="text-muted small">
              You are logged in to Project Tracker
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
