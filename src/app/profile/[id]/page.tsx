const Profile = ({ params }: any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>

      <p>{params.id}</p>
    </div>
  );
};

export default Profile;
