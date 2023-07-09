function ProfileDetails({ user }) {
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`bg-white w-full h-auto flex flex-col text-jetblack p-3 sm:w-full flex-1`}>
            <div className={`w-full`}>
                <img
                    className="w-60 h-60 justify-center mx-auto m-2 object-cover"
                    src={user.imgProfile ? `http://localhost:8000${user.imgProfile}` : undefined}
                    alt={user.username || "/"}
                />
            </div>
            <div className="flex flex-col text-center gap-4 mt-4">
                <div className="flex-1 font-lora text-2xl">
                    {user.username}
                </div>
                <div className="font-josefin text-lg">
                    Store Name: {user.storeName}
                </div>
                <div className="font-josefin text-lg">
                    Email: {user.email}
                </div>
                <div className="font-josefin text-lg">
                    Phone: {user.phone}
                </div>
                <div className="font-josefin text-lg">
                    Address: {user.address}
                </div>
            </div>
        </div>
    );
}

export default ProfileDetails;