const ProfileDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      ProfileDetailsPage : {params.id}
    </div>
  );
};

export default ProfileDetailsPage;
